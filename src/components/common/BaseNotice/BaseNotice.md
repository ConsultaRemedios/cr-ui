### Basic Usage

The BaseNotice works fully dinamically, the `title`, `message` and the `icons`. For `title` and `message` you should send simple strings. For
Icon, it works the same as `BaseIcon` component.
The component also has a `timeout` prop, it works with miliseconds, default is 5000, if you need more, just send as prop as we use in examples:

```
const getIcon = (icons, name) => icons.find((icon) => icon.id === `${name}.icon`) ;
<BaseNotice
  title="Something wrong happened"
  message="Lorem ipsum dolor sit amet"
/>
```
#### Types
```
const getIcon = (icons, name) => icons.find((icon) => icon.id === `${name}.icon`) ;

<div>
  <BaseNotice
    title="Something wrong happened"
    message="Lorem ipsum dolor!!"
    type="danger"
    :icon="getIcon(icons, 'warning')"
  />

  <br />

  <BaseNotice
    title="Sorry, you got an error!"
    message="Lorem ipsum dolor sit amet"
    type="warning"
    :icon="getIcon(icons, 'info')"
  />

  <br />

  <BaseNotice
    title="Congrats all works!"
    type="success"
    :icon="getIcon(icons, 'thumb-up')"
  />

  <br />

  <BaseNotice
    title="Something wrong happened"
    message="Lorem ipsum dolor?"
    type="info"
    :icon="getIcon(icons, 'help')"
  />


</div>
```
#### Snackbar

Defines the Notice type as snackbar, it should be `true` or `false`, default is `false`.
You should also use a method to control the Fading, see the example:

```js
new Vue({
  data() {
    return {
      error: '',
    }
  },
  methods: {
    setError() {
      this.error = 'Houve um erro, você precisa usar uma outra senha';
    },

    clearError() {
      this.error = '';
    },
  },

  template: `
    <div>
      <GridCol :span="{ md: 6 }" :offset="{ md: 4 }">
        <BaseNotice
          v-if="error"
          :snackbar="true"
          :title="error"
          type="danger"
          :scroll-to-self="false"
          :auto-close="true"
          @hide="clearError"
        />
      </GridCol>

      <BaseButton @click="setError">Mostrar Snackbar</BaseButton>
    </div>
  `
})
```
