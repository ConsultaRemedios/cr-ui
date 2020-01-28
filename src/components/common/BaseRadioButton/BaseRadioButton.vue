<template>
  <div>
    <label :class="[$style.wrapper, {[$style.wrapperSelected]: checked}]">
      <input
        type="radio"
        :name="name"
        :value="value"
        @change="onChange"
        :checked="checked"
        v-bind="$attrs"
      />
      <span
        :class="$style.checkmark"
      ></span>
      <span v-if="label" :class="$style.label">{{ label }}</span>
    </label>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    name: 'BaseRadioButton',

    props: {
      label: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        required: true,
      },

      value: {
        type: String,
        required: true,
      },

      checked: {
        type: Boolean,
        default: false,
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
          value: this.value,
        });
      },
    },
  };
</script>

<style module>
  .wrapper {
    cursor: pointer;
    display: block;
    position: relative;
    user-select: none;
    cursor: pointer;
    min-height: 25px;
  }

  .wrapper::before {
    content: '';
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 5px;
    vertical-align: top;
    font-weight: 400;
  }

  .wrapper:hover .checkmark {
    border-color: #ccc
  }

  .label {
    display: inline-block;
    vertical-align: top;
    padding-top: 3px;
    font-weight: 400;
    line-height: 1.4;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid #BDBDBD;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    top: 8px;
    left: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: white;
  }

  .wrapper input {
    position: absolute;
    opacity: 0;
  }

  .wrapperSelected .checkmark {
    background-color: #00AAE5;
    display: block;
    border: 0;
  }

  .wrapperSelected .checkmark:after {
    display: block;
  }
</style>
