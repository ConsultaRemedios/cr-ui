It is just a simple validator written with pure vanilla javascript, not coupled with any framework.
Basically, you define the rules, call the validator with the fields and values you want to validate.

The validator will return a plain object informing if those data are valid or not,
and the error message for each field if it is not valid.

In order to use the validator, you need to follow two steps:

- Build the validator with the validation rules
- Call built validator with the fields you want to validate

See the example below

```js static
import validator from 'cr-ui/src/validator';
import { required, minLength } from 'cr-ui/src/validator/rules';

// 1 - Build the validator with rules
const formValidator = validator({
  firstName: [required()],
  lastName: [required()]
});

// 2 - Call built validator with the fields you want to validate
formValidator({ firstName: '', lastName: '' });

// Example of an invalid response
// => { isValid: false, errors: { firstName: 'Campo obrigatório', lastName: 'Campo obrigatório' }
```

### Validator responses
The validator will return a plain object with two attributes:

**isValid:** true if the form is valid, false if it is not

**errors:** An object with field names as keys and error message as values. If there is not an
error message for the field, the value will be an empty string.

#### Example of an invalid response
```js static
{
  isValid: false,
  errors: {
    firstName: 'Campo obrigatório',
    lastName: 'Campo obrigatório'
  }
}
```

#### Example of a valid response
```js static
{
  isValid: true,
  errors: {
    firstName: '',
    lastName: ''
  }
}
```

### How to use it with vuejs
Since this validator is not coupled with vuejs, you can use the approach you need for each case.
The simpler way to use it, it is setting the error messages for each field based on the values
returned by the validator.

```html static
<template>
  <div>
    <FormField :error="error.firstName">
      <BaseInput
        @change="updateField"
        @blur="validateField"
        name="firstName"
      />
    </FormField>

    <BaseButton @click="submit">
      Send
    </BaseButton>
  </div>
<template>

<script>
  // ...
  import validator from 'cr-ui/src/validator';
  import { required, minLength, sameAs } from 'cr-ui/src/validator/rules';

  const validate = validator({
    firstName: [required()]
  });

  export default {
    // ...
    data() {
      return {
        firstName: '',
        error: {},
      };
    },

    methods: {
      submit() {
        // validate
        const { isValid, errors } = validate({
          firstName: this.firstName
        });

        if (isValid) {
          // submit form
        } else {
          // set errors
          this.error = { ...this.error, ...errors };
        }
      },

      updateField({ name, value }) {
        this[name] = value;
      },

      validateField({ name, value }) {
        // validate
        const { errors } =  validate({
          firstName: this.firstName
        });

        // set field error
        this.error = { ...this.error, [name]: errors[name] };
      },
    },
  };
</script>
```
