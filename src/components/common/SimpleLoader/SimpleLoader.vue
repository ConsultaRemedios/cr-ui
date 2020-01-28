<template>
  <div :class="$style.content">
    <img :class="$style.image" src="./../../../assets/loader.svg" />

    <span v-if="hasSlotData" :class="$style.text">
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'SimpleLoader',

    computed: {
      hasSlotData() {
        return this.$slots.default;
      },
    },
  };
</script>

<style module>
  .image {
    display: block;
    margin: 0 auto;
    animation: rotate-loader 1.5s infinite;
  }

  .text {
    display: block;
    max-width: 200px;
    margin: 10px auto 0;

    font-weight: 600;
    font-size: 16px;
    line-height: 1.3;
    text-align: center;
  }

  @keyframes rotate-loader {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
