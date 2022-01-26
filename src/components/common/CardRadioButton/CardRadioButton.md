CardRadioButton is basically a radiobutton component that has a title and description.

### Checked
```js
<CardRadioButton
  name="address"
  value="home"
  title="My home"
  description="Winterfell - North"
  extraDescription="Jon Snow - 99 99999-9999"
  :checked="true"
/>
```
### Unchecked
```js
<CardRadioButton
  name="address"
  value="work"
  title="My work"
  description="The wall - North"
  extraDescription="Jon Snow - 00 0000-0000"
  :checked="false"
/>
```

### Update checked prop using the one way data flow

```js
new Vue({
  data(){
    return { address: '' };
  },
  methods: {
    onClick(payload) {
      this.address = payload.value
    }
  },
  template: `
    <div>
      <CardRadioButton
        name="address"
        value="home"
        title="My home"
        description="Winterfell - North"
        extraDescription="Jon Snow - (99) 99999-9999"
        :checked="address == 'home'"
        @click="onClick"
      />
      <br>
      <CardRadioButton
        name="address"
        value="work"
        title="My work"
        description="The wall - North"
        extraDescription="Jon Snow - 00 0000-0000"
        :checked="address == 'work'"
        @click="onClick"
      />
    </div>
  `
})
```
