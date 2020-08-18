<template>
  <div :class="$style.container">
    <BaseIcon
      v-if="prefixIcon"
      :id="prefixIcon.icon.id"
      :class="[$style.inputIcon, $style.prefixIcon]"
      :style="{ color: prefixIcon.color }"
    />

    <input
      :class="inputClasses"
      :name="name"
      :style="customStyle"
      v-bind="$attrs"
      @keydown="onKeydown"
      @input="onChange"
      @blur="onBlur"
      @focus="onFocus"
    >

    <BaseIcon
      v-if="suffixIcon"
      :id="suffixIcon.icon.id"
      :class="[$style.inputIcon, $style.suffixIcon]"
      :style="{ color: suffixIcon.color }"
    />

    <img
      v-if="isLoading"
      :class="$style.loader"
      src="./../../../assets/loader-input.svg"
    >
  </div>
</template>

<script>
import BaseIcon from '../BaseIcon';

export default {

  name: 'BaseInput',

  components: {
    BaseIcon,
  },
  inheritAttrs: false,

  props: {
    classes: {
      type: Array,
      default: () => [],
    },

    size: {
      type: String,
      default: 'medium',
    },
    name: {
      type: String,
      default: '',
    },

    hasError: {
      type: Boolean,
      default: false,
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    customStyle: {
      type: Object,
      default: () => {},
    },

    model: {
      type: String,
      default: '',
    },

    prefixIcon: {
      type: Object,
    },

    suffixIcon: {
      type: Object,
    },

  },

  computed: {
    inputClasses() {
      return this.classes.concat([this.$style[this.size], {
        [this.$style.input]: true,
        [this.$style.hasError]: this.hasError,
        [this.$style.isLoading]: this.isLoading,
        [this.$style.inputPadLef]: this.prefixIcon,
        [this.$style.inputPadRig]: this.suffixIcon,
      }]);
    },
  },

  methods: {
    createEvent(e) {
      return {
        name: this.model || this.name,
        value: e.currentTarget.value,
        event: e,
      };
    },

    onKeydown(e) {
      this.$emit('keydown', this.createEvent(e));
    },

    onChange(e) {
      this.$emit('change', this.createEvent(e));
    },

    onBlur(e) {
      this.$emit('blur', this.createEvent(e));
    },

    onFocus(e) {
      this.$emit('focus', this.createEvent(e));
    },
  },
};
</script>

<style module>
  .container {
    position: relative;
  }

  .input {
    width: 100%;
    border: 1px solid #DADADA;
    border-radius: 3px;
    color: #333333;
    -webkit-appearance: none;
  }

  .input:-moz-ui-invalid {
    box-shadow: none;
  }

  .small {
    height: 36px;
    padding: 11px 15px;
    font-size: 14px;
  }

  .medium {
    height: 45px;
    padding: 11px 15px;
    font-size: 15px;
  }

  .inputPadLef {
    padding-left: 35px;
  }

  .inputPadRig {
    padding-right: 35px;
  }

  .hasError {
    border-color: #D30B3F;
  }

  .isLoading {
    padding-right: 50px;
  }

  .input:focus {
    border-width: 2px;
    border-color: #00AAE5;
  }

  .input:disabled {
    background-color: #F9F9F9;
    border-color: #DADADA;
  }

  .input::placeholder {
    color: #AAAAAA;
    opacity: 1;
  }

  .loader {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 18px;
    animation: rotate-loader 1.5s infinite;
  }

  .inputIcon {
    position: absolute;
    top: 50%;
    font-size: 20px;
    transform: translateY(-50%);
  }

  .prefixIcon {
    left: 10px;
  }

  .suffixIcon {
    right: 10px;
  }

  @keyframes rotate-loader {
    0% {
      transform: translateY(-50%) rotate(0deg);
    }

    100% {
      transform: translateY(-50%) rotate(360deg);
    }
  }
</style>
