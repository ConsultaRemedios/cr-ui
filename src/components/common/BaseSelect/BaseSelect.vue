<template>
  <div
    v-click-outside="closeSelect"
    :class="$style.select"
    :style="{ zIndex }"
  >
    <div
      :class="['cr-base-select',
               { ['cr-base-select__has-error']: hasError },
               { ['cr-base-select__rounded']: rounded && !isOpen },
               { ['cr-base-select__top-rounded']: rounded && isOpen },
               { ['cr-base-select__select-opened']: isOpen }
      ]"
    >
      <slot
        name="selected"
        :current-label="currentLabel"
      >
        {{ currentLabel.label }}
      </slot>
    </div>

    <input
      :class="[$style.selectedLabel, {
      }]"
      type="text"
      readonly="readonly"
      :value="currentLabel.value"
      @click="onClickSelect"
      @keydown.prevent.enter="onPressEnter"
      @keydown.prevent.esc="onPressEsc"
      @keydown.prevent.up="navigateUp"
      @keydown.prevent.down="navigateDown"
    >

    <BaseIcon
      :id="icons.nextIcon.id"
      :class="[
        'cr-base-select__svg',
        { ['cr-base-select__svg__error']: hasError },
        { [$style.arrowDown]: !isOpen },
        { [$style.arrowUp]: isOpen }
      ]"
    />

    <div
      v-show="isOpen"
      :class="[
        'cr-base-select__options',
        { ['cr-base-select__options__error']: hasError },
        { ['cr-base-select__options__bottomRounded']: rounded },
        { ['cr-base-select__options__opened']: isOpen }
      ]"
      data-options
    >
      <slot />
    </div>
  </div>
</template>

<script>
import clickOutside from '../../../directives/click-outside';
import BaseIcon from '../BaseIcon';
import nextIcon from '../../../icons/chevron-right.icon.svg';

export default {
  name: 'BaseSelect',

  components: { BaseIcon },

  directives: {
    clickOutside,
  },

  props: {
    placeholder: {
      type: [String, Object],
    },
    options: {
      type: Array,
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: true,
    },

    keyValue: {
      type: String,
      default: 'value',
    },
  },

  data() {
    return {
      isOpen: false,
      hovered: null,
      selected: this.value,
    };
  },

  computed: {
    currentLabel() {
      if (this.selected !== '') {
        const selected = this.getOption(this.selected);
        if (selected) return this.getOption(this.selected);

        return {
          label: this.selected,
          value: this.selected,
        };
      }

      return typeof this.placeholder === 'string'
        ? { label: this.placeholder }
        : this.placeholder;
    },

    zIndex() {
      return this.isOpen ? 2 : 1;
    },

    icons() {
      return {
        nextIcon,
      };
    },
  },

  watch: {
    value(value) {
      this.selected = value;
    },
  },

  created() {
    this.$on('change', this.onOptionChange);
    this.$on('hover', this.onOptionHover);

    if (this.value === '' && !this.placeholder) {
      this.$emit('change', this.options[0].value);
    }
  },

  beforeDestroy() {
    this.$off('change');
    this.$off('hover');
  },

  methods: {
    getOption(value) {
      return this.options.find((o) => o[this.keyValue] === value);
    },

    onOptionChange(value) {
      this.selected = value;
      this.closeSelect();
    },

    onOptionHover(hoveredValue) {
      this.hovered = hoveredValue;
    },

    onClickSelect(e) {
      if (this.isOpen) {
        e.currentTarget.blur();
      }

      this.isOpen = !this.isOpen;
    },

    onPressEnter() {
      const value = this.hovered ? this.hovered : this.value;
      this.$emit('change', value);
    },

    onPressEsc(e) {
      this.closeSelect();

      if (e.currentTarget) {
        e.currentTarget.blur();
      }
    },

    closeSelect() {
      this.isOpen = false;
      this.hovered = null;
    },

    navigateUp() {
      this.navigate('prev');
    },

    navigateDown() {
      this.navigate('next');
    },

    navigate(direction) {
      const { length } = this.options;
      let nextOptionIndex = direction === 'next' ? 0 : length - 1;

      if (this.hovered) {
        const option = this.getOption(this.hovered);
        const optionIndex = this.options.indexOf(option);

        nextOptionIndex = direction === 'prev'
          ? optionIndex - 1
          : optionIndex + 1;
      }

      if (nextOptionIndex >= 0 && nextOptionIndex <= length - 1) {
        this.hovered = this.options[nextOptionIndex][this.keyValue];
        this.$nextTick(() => this.scrollToOption(this.hovered));
      }
    },

    scrollToOption(optionValue) {
      const $option = this.$el.querySelector(`[data-option-value="${optionValue}"]`);
      const $options = this.$el.querySelector('[data-options]');

      if ($option.offsetTop < $options.scrollTop) {
        $options.scrollTop = $option.offsetTop;
      } else if ($option.offsetTop + $option.clientHeight > $options.clientHeight) {
        $options.scrollTop = ($option.offsetTop + $option.clientHeight) - $options.clientHeight;
      }
    },
  },
};
</script>

<style module>
  .select {
    cursor: pointer;
    position: relative;
  }

  .selectedBlock {
    font-size: 15px;
    padding: 11px 44px 11px 15px;
    border: 1px solid #DADADA;
    cursor: pointer;
    position: relative;
    z-index: 2;
    background: #FFF;
  }

  .selectedLabel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 3;
  }

  .arrow {
    font-size: 20px;
    position: absolute;
    z-index: 2;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .arrowDown {
    transform: translateY(-50%) rotate(90deg);
    composes: arrow;
  }

  .arrowUp {
    composes: arrow;
    transform: translateY(-50%) rotate(-90deg);
  }

  .options {
    padding: 10px 0;
    max-height: 300px;

    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    transform: translateY(-1px);

    overflow: auto;
    z-index: 1;

    border: 1px solid #DADADA;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  }

  .hasError {
    border-color: #D30B3F;
  }

  .rounded {
    border-radius: 3px;
  }

  .topRounded {
    border-radius: 3px 3px 0 0;
  }

  .bottomRounded {
    border-radius: 0 0 3px 3px;
  }
</style>

<style lang="scss">
  .cr-base-select {
    font-size: 15px;
    padding: 11px 44px 11px 15px;
    border: 1px solid #DADADA;
    cursor: pointer;
    position: relative;
    z-index: 2;
    background: #FFF;

    &__rounded {
      border-radius: 3px;
    }

    &__top-rounded {
      border-radius: 3px 3px 0 0;
    }

    &__has-error {
      border-color: #D30B3F;
    }

    &__select-opened {

    }
  }

  .cr-base-select__options {
    padding: 10px 0;
    max-height: 300px;

    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    transform: translateY(-1px);

    overflow: auto;
    z-index: 1;

    border: 1px solid #DADADA;
    background: #FFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);

    &__bottom-rounded {
      border-radius: 0 0 3px 3px;
    }
  }
</style>
