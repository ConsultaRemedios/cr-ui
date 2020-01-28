<template>
  <div :class="$style.container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ContainerBlock',
  };
</script>

<style module>
  @value media-md from './../../../styles/variables.css';

  .container {
    width: 100%;
    max-width: 1230px;
    margin: 0 auto;
    padding: 0 10px;
    overflow: hidden;
  }

  @media media-md {
    .container {
      padding: 0 15px;
      overflow: auto;
    }
  }
</style>
