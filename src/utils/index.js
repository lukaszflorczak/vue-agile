export const throttle = (fn, limit) => {
  let wait = false;
  let timeout;
  return (...args) => {
    if (!wait) {
      fn(...args);
      wait = true;
      timeout = setTimeout(() => {
        wait = false;
        if (timeout) {
          clearTimeout(timeout);
        }
      }, limit);
    }
  };
};
