<template>
  <button
    :class="['noise-button', {'active': canvasCompleted }]"
    :style="{ width: `${w}px`, height: `${h}px` }"
    @mouseenter="play"
  >
    <span class="noise-button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import * as PIXI from "pixi.js";
import anime from "animejs";

const options = {
  borderWidth: 1,
  backgroundColor: 0xffffff,
  backgroundAlpha: 1,
  wavesAlpha: 0.8,
  wavesPos: {
    x: 0,
    y: 0
  },
  displacementScale: { x: 30, y: 50 },
  displacementMap: require("./map.jpg")
};

export default {
  name: "NoiseButton",
  props: {
    color: {
      type: String,
      default: "0xb836c6"
    },
    w: {
      type: [String, Number]
    },
    h: {
      type: [String, Number]
    }
  },
  data: () => ({
    animate: false,
    canvasCreated: false,
    canvasCompleted: false,
    app: new PIXI.Application({
      autoStart: false,
      autoResize: true,
      transparent: true
    })
  }),
  mounted() {
    // Set color from props
    options.borderColor = this.color;

    // Compute polygon size
    options.polygon = `${this.$el.offsetHeight * 0.4}, 0, ${this.$el
      .offsetHeight * 0.4}, 0`;

    // Init
    this.init();
  },
  methods: {
    init() {
      // Offset
      this.offset = 20;

      // Polygon
      this.polygon = options.polygon
        .replace(/\s/g, "")
        .split(",")
        .map(el => {
          const number = el | 0;
          return number > options.borderWidth
            ? number - options.borderWidth / 2
            : number;
        });

      // Create canvas
      this.createCanvas();
    },

    async createCanvas() {
      this.canvasCreated = true;

      // Append canvas into button
      this.$el.appendChild(this.app.view);

      // Creating container and append it
      this.container = new PIXI.Container();
      this.app.stage.addChild(this.container);

      // Waves texture
      const wavesTexture = await this.loadTexture(options.waves);
      this.waves = new PIXI.Sprite(wavesTexture);

      // Noise sprite
      this.noiseSprite = PIXI.Sprite.from(options.displacementMap);

      // Draw
      this.setSize();
      this.addGraphics();
      this.bindEvents();
      this.render();

      this.canvasCompleted = true;
    },

    loadTexture(src) {
      return new Promise(resolve => {
        const loader = new PIXI.Loader();
        loader.add("waves", src);
        loader.load((loader, resources) => resolve(resources.waves.texture));
      });
    },

    setSize() {
      const parentWidth = this.$el.offsetWidth;
      const parentHeight = this.$el.offsetHeight;

      this.width = parentWidth + this.offset * 2;
      this.height = parentHeight + this.offset * 2;

      if (this.oldWidth !== this.width) {
        this.app.renderer.resize(this.width, this.height);
        this.oldWidth = this.width;
        return true;
      }

      return false;
    },

    bindEvents() {
      this.createTimeLine();

      window.addEventListener("resize", () => {
        this.resize();
      });
    },

    addGraphics() {
      this.container.addChild(this.getPolygon(true));

      if (options.waves) this.drawWaves();

      const rect = new PIXI.Graphics();
      rect.beginFill(0, 0);
      rect.drawRect(0, 0, this.width, this.width);

      this.container.addChild(rect);
      this.container.addChild(this.getPolygon());
      this.setMask();
      this.addFilter();
    },

    getPolygon(background) {
      const points = this.polygon;
      const graphics = new PIXI.Graphics();

      const width = this.width - this.offset * 2 - options.borderWidth;
      const height = this.height - this.offset * 2 - options.borderWidth;

      graphics.position.x = this.offset + options.borderWidth / 2;
      graphics.position.y = this.offset + options.borderWidth / 2;

      const arrayLines = [
        [0, points[0]],
        [points[0], 0],
        [width - points[1], 0],
        [width, points[1]],
        [width, height - points[2]],
        [width - points[2], height],
        [points[3], height],
        [0, height - points[3]],
        [0, points[0]]
      ];

      graphics.lineStyle(options.borderWidth, options.borderColor);

      graphics.beginFill(
        options.backgroundColor,
        background ? 1 - options.backgroundAlpha : 0
      );

      for (let i = 0, prevCoords = []; i < arrayLines.length; i++) {
        if (
          prevCoords.length &&
          prevCoords[0] === arrayLines[i][0] &&
          prevCoords[1] === arrayLines[i][1]
        )
          continue;

        if (i === 0) {
          graphics.moveTo(arrayLines[i][0], arrayLines[i][1]);
          prevCoords = arrayLines[i];
          continue;
        }

        prevCoords = arrayLines[i];
        graphics.lineTo(arrayLines[i][0], arrayLines[i][1]);
      }

      graphics.endFill();

      return graphics;
    },

    drawWaves() {
      this.waves.alpha = 1 - options.wavesAlpha;

      this.waves.y = this.height * options.wavesPos.y;
      this.container.addChild(this.waves);

      this.waves.width = this.waves.height = this.width;
    },

    setMask() {
      let mask = this.getPolygon();
      this.app.stage.addChild(mask);
      this.container.mask = mask;
    },

    addFilter() {
      this.container.addChild(this.noiseSprite);

      this.noiseFilter = new PIXI.filters.DisplacementFilter(this.noiseSprite);
      this.container.filters = [this.noiseFilter];

      this.noiseSprite.position.x = -this.width;
      this.noiseSprite.width = this.width * 3;

      this.noiseFilter.scale.x = 0;
      this.noiseFilter.scale.y = 0;
    },

    createTimeLine() {
      // Timeline instance
      this.timeline = anime.timeline({
        easing: "easeInOutSine",
        update: e => {
          this.render();
        },
        begin: () => (this.animate = true),
        complete: () => (this.animate = false)
      });

      this.timeline
        .add({
          duration: 200,
          targets: this.noiseFilter.scale,
          x: options.displacementScale.x,
          y: options.displacementScale.y
        })
        .add(
          {
            duration: 500,
            targets: this.noiseSprite,
            x: [-(this.noiseSprite.width * 0.66), 0]
          },
          "-=200"
        )
        .add(
          {
            duration: 200,
            targets: this.noiseFilter.scale,
            x: 0,
            y: 0
          },
          "-=200"
        );
    },

    resize() {
      if (this.setSize()) {
        this.container.removeChildren(0, this.container.children.length - 1);

        this.addGraphics();
        this.createTimeLine();
        this.render();
      }
    },

    render() {
      this.app.render();
    },

    play() {
      if (!this.animate) this.timeline.restart();
    }
  }
};
</script>

<style lang="sass" scoped>
.noise-button
  position: relative

  display: flex
  align-items: center
  justify-content: center

  width: 282px
  height: 80px

  opacity: 0
  pointer-events: none

.noise-button.active
  opacity: 1
  pointer-events: auto

.noise-button__text
  text-transform: uppercase

.noise-button /deep/ canvas
  z-index: 1
  position: absolute

  width: 100%
  height: 100%

  pointer-events: none

</style>

