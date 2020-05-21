### Basic usage
By default, input fill the parent element size
```js
  <BaseInput placeholder="Type something here..."/>
```

### With error
```js
  <BaseInput :has-error="true"/>
```

### Loading State
```js
  <BaseInput :is-loading="true"/>
```

### Disabled State
```js
  <BaseInput :disabled="true"/>
```
### With prefix or suffix icon
```js
  <BaseInput 
    :prefix-icon="{ icon: $getIcon(allIcons, 'place'), color: '#00AAE5' }" 
    :suffix-icon="{ icon: $getIcon(allIcons, 'search'), color: '#666666' }"
    size="small" 
  />
```