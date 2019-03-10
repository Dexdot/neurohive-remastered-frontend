import store from '../store/index';

export const isLogged = (to, from, next) => {
  if (store.getters.loggedIn) {
    next();
  } else {
    next(from.path);
  }
};

export const isNotLogged = (to, from, next) => {
  if (store.getters.loggedIn) {
    next(from.path);
  } else {
    next();
  }
};
