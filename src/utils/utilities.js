export const pipe = (...fncs) => (component) =>
  fncs.reduce((acc, next) => next(acc), component);