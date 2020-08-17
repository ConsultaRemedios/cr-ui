<template>
  <div>
    <label :class="[
      $style.wrapper,
      { [$style.isSelected]: checked, [$style.isDisabled]: disabled }
    ]">
      <input
        :class="$style.input"
        :name="name"
        type="checkbox"
        :checked="checked"
        :disabled="disabled"
        v-bind="$attrs"
        @change="onChange"
      >

      <span
        v-if="label"
        :class="$style.label"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  inheritAttrs: false,

  props: {
    checked: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },

    model: {
      type: String,
      default: '',
    },
  },

  methods: {
    onChange() {
      this.$emit('change', {
        name: this.model || this.name,
        value: this.checked ? '' : this.value,
      });
    },
  },
};
</script>

<style module>
  .wrapper {
    cursor: pointer;
    display: flex;
    position: relative;
    font-weight: 400;
  }

  .wrapper::before {
    content: '';
    flex-shrink: 0;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #BDBDBD;
    border-radius: 3px;
    margin-right: 10px;
  }

  .wrapper:hover::before {
    border: 1px solid #138484;
  }

  .wrapper.isSelected::before {
    border-color: #138484;
    background-color: #138484;
  }

  .wrapper.isDisabled::before {
    background-color: #F2F2F2;
    border: 2px solid #DADADA;
  }

  .wrapper::after {
    content: '';
    display: block;
    width: 16px;
    height: 12px;
    background: url('./../../../assets/check-icon.svg');
    position: absolute;
    top: 4px;
    left: 2px;

    transform: scale(0);
    transition: transform 0.1s ease-out;
  }

  .label {
    line-height: 1.4;
  }

  .wrapper.isSelected::after {
    transform: scale(1);
  }

  .wrapper.isDisabled::after {
    background: #DADADA;
    width: 12px;
    height: 4px;
    top: 8px;
    left: 4px;
    transform: scale(1);
  }

  .input {
    display: none;
  }
</style>
