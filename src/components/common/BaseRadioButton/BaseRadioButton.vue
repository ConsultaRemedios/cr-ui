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
      <span :class="$style.checkmark"></span>
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
  content: "";
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-right: 5px;
  vertical-align: top;
  font-weight: 400;
}

.wrapper:hover .checkmark {
  border-color: #138484;
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
  height: 24px;
  width: 24px;
  background-color: white;
  border-radius: 50%;
  border: 1px solid #595959;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.wrapper input {
  position: absolute;
  opacity: 0;
}

.wrapperSelected .checkmark {
  display: block;
  border-color: #138484;
  background-color: #138484;

}

.wrapperSelected .checkmark:after {
  display: block;
  left: 7px;
  width: 7px;
  height: 10px;
  border: solid #fff;
  margin-top: 5.3px;
  border-radius: 1px;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
  background: #138484;
}
</style>
