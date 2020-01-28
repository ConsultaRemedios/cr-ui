const debounce = (function debounceIFFE() {
  let timeout = null;

  return function debounceClojure(time, cb) {
    clearTimeout(timeout);
    timeout = setTimeout(cb, time);
  };
}());

const max = (array) => {
  let maxValue = array[0];

  for (let i = 1; i < array.length; i += 1) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  return maxValue;
};

export { debounce, max };
