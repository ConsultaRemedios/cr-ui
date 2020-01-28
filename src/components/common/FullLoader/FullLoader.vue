<template>
  <div v-show="show" :class="$style.loader">
    <SimpleLoader :text="text" />
  </div>
</template>

<script>
  import SimpleLoader from '../SimpleLoader';

  export default {
    name: 'FullLoader',

    props: {
      text: {
        type: String,
        required: true,
      },
      show: {
        type: Boolean,
        required: true,
      },
    },

    components: {
      SimpleLoader,
    },
  };
</script>

<style module>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 999;
  }
</style>
