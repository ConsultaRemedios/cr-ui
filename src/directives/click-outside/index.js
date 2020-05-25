let nodeList = [];
let seed = 0;
const ctx = '@@click-outside';

const documentHandler = el => (event) => {
  const { target } = event;

  if (el === target || el.contains(target)) {
    return;
  }

  if (typeof el[ctx].bindingFn === 'function') {
    el[ctx].bindingFn(event);
  }
};

document.addEventListener('mouseup', (e) => {
  nodeList.forEach(node => node[ctx].documentHandler(e));
});

export default {
  bind(el, binding) {
    seed += 1;

    // eslint-disable-next-line no-param-reassign
    el[ctx] = {
      id: seed,
      documentHandler: documentHandler(el),
      bindingFn: binding.value,
    };

    nodeList = nodeList.concat(el);
  },

  unbind(el) {
    for (let i = 0; i < nodeList.length; i += 1) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    // eslint-disable-next-line no-param-reassign
    delete el[ctx];
  },
};
