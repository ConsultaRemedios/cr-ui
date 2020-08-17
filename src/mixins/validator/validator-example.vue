<template>
  <div :class="$style.wrapper">
    <div>
      <FormField
        label="Nome"
        :error="fieldError('name')"
      >
        <BaseInput
          name="name"
          @change="onChangeField"
        />
      </FormField>
    </div>

    <div>
      <FormField
        label="Email"
        :error="fieldError('email')"
      >
        <BaseInput
          name="email"
          @change="onChangeField"
        />
      </FormField>
    </div>

    <div>
      <BaseButton :disabled="!isFormValid">
        Enviar
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { required, email, minLength as minLengthRef } from 'vuelidate/lib/validators';

import validator from './validator';

import FormField from '../../components/common/FormField';
import BaseInput from '../../components/common/BaseInput';
import BaseButton from '../../components/common/BaseButton';

// work around vue-docgen
const minLength = minLengthRef ? minLengthRef(3) : function empty() {};

export default {
  name: 'ValidatorExample',
  components: { FormField, BaseInput, BaseButton },
  mixins: [validator],

  data: () => ({
    name: '',
    email: '',
  }),

  methods: {
    onChangeField({ name, value }) {
      this[name] = value;

      this.validateField(name);
    },
  },

  validations: {
    name: { required, minLength },
    email: { required, email },
  },
};
</script>

<style module>
  .wrapper > div {
    margin-bottom: 20px;
  }

  .wrapper > div:last-child {
    margin-bottom: 0;
  }
</style>
