```js
new Vue({
  data(){
    return { creditCardNumber: '' };
  },
  methods: {
    onChange(e) {
      this.creditCardNumber = e.value
    }
  },
  template: `
    <CreditCardField @change="onChange" :value="creditCardNumber"/>
  `,
});
```
