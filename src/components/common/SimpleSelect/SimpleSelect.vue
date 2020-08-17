<template>
  <div :class="$style.wrapper">
    <div :class="$style.select">
      <span :class="$style.selectText">
        <span>{{ label }}</span>
      </span>

      <span :class="$style.selectIcon">
        <BaseIcon :id="icon.id" />
      </span>
    </div>

    <select
      :class="$style.nativeSelect"
      :name="name"
      v-bind="$attrs"
      @change="onChange"
    >
      <option
        disabled
        :selected="!value"
      >
        {{ placeholder }}
      </option>

      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :selected="value === option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import BaseIcon from '../BaseIcon';
import arrowIcon from '../../../icons/drop.icon.svg';

export default {
  name: 'SimpleSelect',
  components: { BaseIcon },
  inheritAttrs: false,

  props: {
    name: { type: String },
    model: { type: String },

    options: {
      type: Array,
      default: () => ([]),
    },

    selected: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: 'Selecione',
    },
  },

  data() {
    return {
      value: this.selected,
    };
  },

  computed: {
    label() {
      const option = this.options.find((o) => o.value === this.value);
      return option ? option.label : this.placeholder;
    },

    icon() {
      return arrowIcon;
    },
  },

  methods: {
    onChange({ target }) {
      const { value } = target;

      this.value = value;

      this.$emit('change', {
        name: this.model || this.name || '',
        value,
      });
    },
  },
};
</script>

<style module>
  .wrapper {
    position: relative;
  }

  .select {
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 15px;
    background: #FFF;
    border: 1px solid #DADADA;
    border-radius: 3px;
  }

  .selectText {
    font-size: 15px;
    color: #333333;
    flex-grow: 1;
    max-width: calc(100% - 24px);
  }

  .selectText > span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nativeSelect {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    opacity: 0;
  }
</style>
