The mask directive helps us to mask input fields. We use `the vanilla-masker` plugin
to mask the values.


```js
const mask = require('./index').default;

new Vue({
  directives: { mask },
  template: `
    <div>
      <BaseLabel :required="false">Zipcode Pattern</BaseLabel>
      <BaseInput name="zipcode" v-mask="'zipcode'" placeholder="99999-999"/>

      <br/>

      <BaseLabel :required="false">Custom Patterns (string)</BaseLabel>
      <BaseInput name="zipcode" v-mask="'999.9'" placeholder="999.9"/>

      <br/>

      <BaseLabel :required="false">Custom Patterns (array)</BaseLabel>
      <BaseInput name="zipcode" v-mask="['999.9', '99.999']" placeholder="999.9 or 99.999"/>

      <br/>

      <BaseLabel :required="false">Money Mask</BaseLabel>
      <BaseInput name="money" v-mask="'money'" placeholder="R$ 150,00"/>
    </div>
  `
});
```

To use the directive, you gonna need to add the directive on component

```js static
  import mask from 'cr-ui/src/directives/mask';

  export default {
    // ...
    directives: { mask }
  }
```

Then, on the template, you can add the v-mask directive on the field
with the pattern you need to as the value

```html static
  <BaseInput name="zipcode" v-mask="'zipcode'"/>
```

### Masks types
There are two formats you can use to define the masks on components:

### Using defined patterns
You can use one of the defined patterns below:
  * cpf
  * phone
  * zipcode
  * date

To use a defined pattern, just pass the directive value as a string.
See the example:
```html static
<BaseInput name="zipcode" v-mask="'zipcode'"/>
<BaseInput name="zipcode" v-mask="'phone'"/>
<BaseInput name="zipcode" v-mask="'date'"/>
```

### Using custom patterns
To use a custom pattern, just pass a pattern (see on vanilla-masker doc) as directive value.
**Not Recommended** In order to maintain the UI consistency, we suggest you add new patterns
when necessary, instead of using the custom type approach.

```html static
<BaseInput name="phone" v-mask="['(99) 9999-9999', '(99) 99999-9999']"/>
```
