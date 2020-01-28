### Basic Usage
FormField is a component responsible to group label, field and error messages
```js
  <FormField label="Name">
    <BaseInput placeholder="type your name"/>
  </FormField>
```

### FormField with error
```js
  <FormField label="Name"
    error="campo obrigatório"
  >
    <BaseInput placeholder="type your name" :has-error="true"/>
  </FormField>
```

### FormField with focus
```js
  <FormField label="Name">
    <BaseInput placeholder="type your name" :autofocus="true" />
  </FormField>
```


### FormField without label
```js
  <FormField>
    <BaseInput placeholder="type your name" />
  </FormField>
```
