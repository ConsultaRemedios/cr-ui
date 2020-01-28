<template>
  <div :class="[$style.option, {
      [$style.hover]: this.isHover
    }]"
    @click="onClick"
    @mouseover="onHover"
    :data-option-value="value"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'BaseOption',
    props: {
      value: {
        type: [String, Number],
        required: true,
      },
    },

    computed: {
      isHover() {
        return this.$parent.hovered && this.$parent.hovered === this.value;
      },
    },

    methods: {
      onClick() {
        this.$parent.$emit('change', this.value);
      },

      onHover() {
        this.$parent.$emit('hover', this.value);
      },
    },
  };
</script>

<style module>
  .option {
    font-size: 15px;
    padding: 10px 15px;
  }

  .hover {
    background: #F9F9F9;
  }
</style>
