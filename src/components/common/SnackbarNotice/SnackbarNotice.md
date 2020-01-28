We have many different variations on BaseNotice component. The **SnackbarNotice** encapsulates
the BaseNotice component with specific prop values into it in order to increase the UI consistency
for user feedback messages

### Types

```js
let showError = false;
let showSuccess = false;

<div>
  <SnackbarNotice v-if="showError"
    type="error"
    content="Ops, something wrong happened"
    @hide="showError = false"
  />

  <SnackbarNotice v-if="showSuccess"
    type="success"
    content="Everything is fine"
    @hide="showSuccess = false"
  />

  <BaseButton @click="showError = true">
    Show error SnackbarNotice
  </BaseButton>

  <BaseButton @click="showSuccess = true">
    Show success SnackbarNotice
  </BaseButton>
</div>
```

### Content prop as a string

```js
let error = false;

<div>
  <SnackbarNotice v-if="error"
    type="error"
    content="Ops, something wrong happened"
    @hide="error = false"
  />

  <BaseButton @click="error = true">
    Show SnackbarNotice with content as string
  </BaseButton>
</div>
```

### Content prop as an object

```js
let error = false;

<div>
 <SnackbarNotice v-if="error"
    type="error"
    :content="{ title: 'Ops, something wrong happened', message: 'Something more detailed here' }"
    @hide="error = false"
  />

  <BaseButton @click="error = true">
    Show SnackbarNotice with content as object
  </BaseButton>
</div>
```
