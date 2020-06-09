<template>
  <span :class="'cr-ui-skeleton-placeholder'" :style="styles"></span>
</template>

<script>
  export default {
    name: 'SkeletonPlaceholder',

    props: {
      width: {
        type: String,
        default: '',
      },

      height: {
        type: String,
        default: '',
      },
    },

    computed: {
      styles() {
        return `width:${this.width}; height:${this.height}`;
      },
    },
  };
</script>

<style lang="scss">
  @import '../../../styles/components/skeleton-placeholder';
</style>
