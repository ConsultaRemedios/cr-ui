### (Deprecated)

Validator is a mixin created to make easier form validations on vue components.
What the validator mixin does is generating the error messages according with
field rules defined on vue component. We use `vuelidate` plugin to validate the fields and based
on its interface, we set the error messages for each field.

```js
const Vue = require ('vue').default;
const validatorExample = require('./validator-example.vue').default;
Vue.component('ValidatorExample', validatorExample)

<ValidatorExample/>
```

The validator will create a data errors object which each key will be the field name and the value
of that key will be the error message, so you can render the error message like this:

```html static
<span>{{errors.name}}<span>
```

Considering the field "name" as invalid by required rule, the output would be:

```html static
<span>Campo obrigatório</span>
```

### Important
We suggest to always use the `fieldError` method to render the errors message, because it handles
when the `errors` object does not have the specific field as key yet, returning an empty string
instead of undefined. So the example above, should be:

```html static
<span>fieldError('name')</span>
```

### How to use
For configuration, you need to:

Import the rules and mixin for being used on the vue component:
```js static
  import { required, email } from 'vuelidate/lib/validators';
  import validator from './validator.js';
```

Register the mixin:
```js static
{
  name: 'ValidatorExample',
  mixins: [validator],
}
```

Add the fields and validation rules for each field

```js static
{
  name: 'ValidatorExample',
  mixins: [validator],
  data: () => ({
    name: '',
    email: ''
  }),

  validations: {
    name: { required },
    email: { email }
  }
}
```

That's it for configuration. Now, in order to validate the fields and get the error message,
you gonna need to call some methods.

### Validating on change field value
For validating and updating the error messages on change a field value, you can call
`validateField` method, passing the field name as param

```html static
<template>
  <BaseInput @change="onChange">
<template>

<script>
  export default {
    ...
    methods: {
      onChange({ name, value }) {
        this[name] = value;
        this.validateField(name);
      }
    }
  }
</script>
```

### Validating the entire form
Also, you can validate the entire form on submit it

```html static
<template>
  <div>
    ...
    <BaseButton @click="onSubmit">Enviar</BaseButton>
  </div>
</template>

<script>
  export default {
    ...

    onSubmit() {
      // this.validateForm return true if the form is valid or false is form is invalid
      if (this.validateForm()) {
        // do something
      }
    }
  }
</script>
```

### Computed props
If you want to disable the submit button when the form is invalid, you can use the
`isFormValid` computed prop:

```html static
<template>
  <div>
    ...
    <BaseButton @click="onSubmit" :disabled="isFormValid">Enviar</BaseButton>
  </div>
</template>
```

### Setting errors on fields manually
If you need to set an error to the fields manually, after receive a server error, for example, just call **setFieldError** method passing a plain object to it, where the key is the field name and the value is the error message. See the example:

```js static
export default {
  someMethod() {
    someRequest('foobar.com').catch(({ response }) => {
      this.setFieldError(response.formErrors);
    });
  },
}
```
