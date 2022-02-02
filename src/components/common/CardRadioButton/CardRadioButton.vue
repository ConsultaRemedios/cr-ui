<template>
  <div
    :class="[
      $style.wrapper,
      {[$style.checked]: checked}
    ]"
    @click="onClick"
  >
    <BaseRadioButton
      :checked="checked"
      :class="$style.radiobutton"
      :value="value"
      :name="name"
    />
    <div>
      <span :class="$style.title">{{ title }}</span>
      <span :class="$style.description">
        {{ description }}
      </span>
      <span v-if="extraDescription" :class="$style.description">
        {{ extraDescription }}
      </span>
    </div>
  </div>
</template>

<script>
import BaseRadioButton from '../BaseRadioButton';

export default {
  name: 'CardRadioButton',
  components: {
    BaseRadioButton,
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    extraDescription: {
      type: String,
      default: '',
    },
  },

  methods: {
    onClick() {
      if (this.checked) return;

      this.$emit('click', {
        name: this.name,
        value: this.value,
      });
    },
  },
};
</script>

<style module>

  .wrapper {
    border: 1px solid rgba(210, 218, 218, 0.7);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    margin-top: 8px;
    padding: 14px 16px 18px;
  }

  .checked {
    border: 1px solid #169998;
  }

  .radiobutton {
    align-items: center;
    display: flex;
    justify-content: center;
    padding-right: 10px;
  }

  .title {
    color: #333;
    font-size: 18px;
    font-weight: bold;
  }

  .description {
    color: #646363;
    font-size: 16px;
    display: block;
  }
</style>
