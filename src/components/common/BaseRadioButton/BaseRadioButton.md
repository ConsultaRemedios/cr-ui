### Basic Usage
 ### Checked
```js
<BaseRadioButton name="gender" value="male" :checked="true" label="Checkbox"/>
```
### Unchecked
```js
<BaseRadioButton name="gender" value="male" :checked="false" label="Checkbox"/>
```

### Update checked prop using the one way data flow

```js
new Vue({
  data(){
    return { gender: '' };
  },
  methods: {
    onChange(payload) {
      this.gender = payload.value
    }
  },
  template: `
    <div>
      <BaseRadioButton name="gender" value="male" :checked="gender == 'male'" label="Male" @change="onChange"/>
      <br>
      <BaseRadioButton name="gender" value="female" :checked="gender == 'female'" label="Female" @change="onChange"/>
    </div>
  `
})
```