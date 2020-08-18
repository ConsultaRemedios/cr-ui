<template>
  <label
    :class="[
      $style.label,
      {
        [$style.hasError]: hasError,
      }
    ]"
    :for="isFor"
  >
    <div :class="$style.fullWidth">
      <span :class="[$style.text, { [$style.isRequired]: required }]">
        <slot />
      </span>

      <slot name="outerSlot" />
    </div>
  </label>
</template>

<script>
export default {
  name: 'BaseLabel',
  props: {
    /**
      * Same as for attribute on native label element
      */
    isFor: {
      type: String,
    },

    required: {
      type: Boolean,
      default: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    hasError: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module>
  .label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
  }

  .text {
    display: block;
    font-size: 15px;
  }

  .isRequired::after {
    content: "*";
  }

  .lightText {
    font-size: 14px;
    color: #999999;
  }

  .hasError {
    color: #D30B3F;
  }

  .fullWidth {
    width: 100%;
  }
</style>
