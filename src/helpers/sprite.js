import BrowserSprite from 'svg-baker-runtime/src/browser-sprite';

const sprite = new BrowserSprite();

['DOMContentLoaded', 'page:load'].forEach((event) => {
  document.addEventListener(event, () => {
    // Ensure mount method runs properly
    // https://github.com/kisenka/svg-mixer/blob/fabb15e3a7b3e7e3f2f27d0b6a49f7dadbc44b1b/packages/svg-mixer/runtime/src/browser-sprite.js#L197
    sprite.node = null;

    sprite.mount(document.body, true);
  });
});

export default sprite;
