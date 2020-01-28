Sometimes we need to change text content or even components according
with breakpoints changes. This mixin listens for the window resize event
and provides the breakpoint and viewport size values for the component

## Live example
```js
const breakpointable = require('./breakpointable').default;

new Vue({
  name: 'LiveExample',
  mixins: [breakpointable],
  template: `
    <div>
      <h3>breakpoint: {{breakpoint}}</h3>
      <h3>isMobileBreakpoint: {{isMobileBreakpoint}}</h3>
      <h3>isTabletBreakpoint: {{isTabletBreakpoint}}</h3>
      <h3>isDesktopBreakpoint: {{isDesktopBreakpoint}}</h3>
      <h3>viewport width: {{viewportWidth}}</h3>
    </div>
  `
})
```

## Example of usage

```html static
<template>
  <MenuMobile v-if="breakpoint === 'xl'"/>
  <Menu v-else/>
</template>

<script>
  import breakpointable from 'cr-ui/src/mixins/breakpointable';

  export default {
    name: 'ComponentExample',
    mixins: [breakpointable]
  };
</script>
```
