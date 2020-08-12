<template>
  <div :class="[$style.option, {
      ['cr-base-option__hover']: this.isHover
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

      emitEvent: {
        type: Boolean,
        default: true,
      },
    },

    computed: {
      isHover() {
        return this.emitEvent && this.$parent.hovered && this.$parent.hovered === this.value;
      },
    },

    methods: {
      onClick() {
        if (this.emitEvent) this.$parent.$emit('change', this.value);
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

  :global(.cr-base-option__hover) {
    background: #F9F9F9;
  }
</style>
