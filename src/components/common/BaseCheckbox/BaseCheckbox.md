### Basic Usage

BaseCheckbox component follows the one way data flow, it means the component does not have an
internal state to control if it is checked or not. The **checked** prop passed to it is the only
one responsible for handling the checkbox state. So, if you don't update the state that is passed
as the checked prop, the BaseCheckbox will be stay freezed. See the examples:

#### Checked
```js
<BaseCheckbox name="newsletter" value="on" label="This is a checked checkbox" :checked="true"/>
```

#### Unchecked
```js
<BaseCheckbox name="newsletter" value="on" label="This is a unchecked checkbox"/>
```

#### Disabled
```js
<BaseCheckbox name="newsletter" value="" label="This is a disable checkbox" :disabled="true"/>
```

#### Update checked prop using the one way data flow
```js
new Vue({
  data() {
    return {
      newsletter: '',
    };
  },
  methods: {
    onChangeCheckbox({ name, value }) {
      this[name] = value;
    },
    isChecked(name) {
      return this[name] === 'on';
    },
  },
  template: `
    <div>
      <BaseCheckbox
        name="newsletter"
        value="on"
        label="This is a checked checkbox"
        :checked="isChecked('newsletter')"
        @change="onChangeCheckbox"
      />
    </div>
  `,
})
```