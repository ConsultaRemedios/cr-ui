<template>
  <div :data-form-field-with-error="!!error">
    <div v-if="label">
      <BaseLabel
        :is-for="isFor"
        :has-error="!!error"
        :required="required"
        :disabled="disabled"
      >
        {{ label }}

        <template slot="outerSlot">
          <div :class="$style.innerSlot">
            <slot></slot>
          </div>
        </template>
      </BaseLabel>
    </div>

    <slot v-if="!label" />

    <div
      v-if="error"
      :class="$style.errorMessage"
    >
      <span>
        {{ error | capitalize }}
      </span>
    </div>
  </div>
</template>

<script>
import BaseLabel from '../BaseLabel';
import { capitalize } from '../../../filters';

export default {
  name: 'FormField',
  components: {
    BaseLabel,
  },
  filters: {
    capitalize,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    isFor: {
      type: String,
    },
    error: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module>
  .errorMessage {
    display: block;
    text-align: left;
    margin-top: 10px;
    color: #D30B3F;
  }

  .innerSlot {
    margin-top: 8px;
  }
</style>
