export const auth = {
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    validEmail() {
      return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(this.email);
    },
    validPassword() {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
        this.password
      );
    }
  }
};
