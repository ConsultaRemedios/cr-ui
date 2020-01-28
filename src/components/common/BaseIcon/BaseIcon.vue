<template>
  <svg viewBox="0 0 24 24" :class="$style.icon" v-bind="$attrs">
    <use :xlink:href="`#${id}`" />
  </svg>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BaseIcon',
  props: {
    id: String,
  },
};
</script>

<style module>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  font-size: 24px;
}
</style>
