import { validationMixin } from 'vuelidate';
import getErrorMessage from './error-messages';

export default {
  mixins: [validationMixin],
  data: () => ({ errors: {} }),

  created() {
    this.errors = Object.keys(this.$options.validations).reduce((acc, field) => ({
      ...acc,
      [field]: '',
    }), {});
  },

  methods: {
    fieldError(name) {
      return this.errors[name] || '';
    },

    setFieldError(error) {
      Object.keys(error).forEach((fieldName) => {
        const errorMessage = error[fieldName];

        if (typeof errorMessage === 'string') {
          this.$set(this.errors, fieldName, errorMessage);
        } else {
          this.$set(this.errors, fieldName, errorMessage[0]);
        }
      });
    },

    validateField(name) {
      const field = this.$v[name];
      const rules = Object.keys(field.$params);
      const ruleWithError = rules.find((rule) => !field[rule]);

      this.errors[name] = '';

      this.$v.$touch();

      if (ruleWithError) {
        this.errors[name] = getErrorMessage(field, ruleWithError);
        return false;
      }

      return true;
    },

    validateForm() {
      return Object.keys(this.$v.$params)
        .map((fieldName) => this.validateField(fieldName))
        .every((isValid) => isValid);
    },
  },

  computed: {
    isFormValid() {
      if (this.$v.$dirty) {
        return Object.keys(this.errors).every((field) => !this.errors[field]);
      }

      return true;
    },
  },
};
