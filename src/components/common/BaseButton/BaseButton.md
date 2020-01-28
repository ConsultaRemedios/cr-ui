### Sizes

```js
  <div>
    <BaseButton size="small">Button small</BaseButton>
    <BaseButton size="medium">Button medium</BaseButton>
    <BaseButton size="large">Button large</BaseButton>
  </div>
```

### Types

```js 
  <div>
    <BaseButton type="success">Button success</BaseButton>
    <BaseButton type="info">Button info</BaseButton>
    <BaseButton type="warning">Button warning</BaseButton>
    <BaseButton type="neutral">Button neutral</BaseButton>
    <BaseButton type="danger">Button danger</BaseButton>
    <BaseButton type="naked">Button naked</BaseButton>
    <BaseButton type="naked-red">Button naked-red</BaseButton>
  </div>
```

### Fill

Fill property forces the button width to fill 100% width of its parent.

```js
<div>
  <div :style="{ marginBottom: '15px' }">
    <BaseButton :fill="true">Example 1</BaseButton>
  </div>
  <div>
    <BaseButton type="neutral" :fill="true">Example 2</BaseButton>
  </div>
</div>
```

### Combining type and size props

```js
  <div>
    <BaseButton type="neutral" size="large">Button neutral large</BaseButton>
    <BaseButton type="success" size="medium">Button success medium</BaseButton>
  </div>
```

### Button as an achor tag

Just add a `path` prop with the url you want to link to as the value.
You can also open the link in a new tab using the `openNewTab` prop as true

```js
  <div>
    <BaseButton type="neutral" path="http://www.google.com">
      Anchor default
    </BaseButton>

    <BaseButton type="success" size="large" path="http://www.google.com" :openNewTab="true">
      Anchor new tab
    </BaseButton>
  </div>
```

### Disabled State

```js
<div>
  <BaseButton :disabled="true">Button neutral</BaseButton>
  <BaseButton :disabled="true" type="naked">Button naked</BaseButton>
  <BaseButton :disabled="true" type="naked-red">Button naked red</BaseButton>
</div>
```

### Inverted option

Invert the background-color and border-color by adding this option

```js
<div>
  <BaseButton :inverted="true" type="success">Success inverted</BaseButton>
  <BaseButton :inverted="true" type="info">Info inverted</BaseButton>
  <BaseButton :inverted="true" type="warning">Warning inverted</BaseButton>
  <BaseButton :inverted="true" type="danger">Danger inverted</BaseButton>
  <BaseButton :inverted="true" type="neutral">Neutral inverted</BaseButton>
</div>
```

### Loading button

Add a behavior of loading to button

```js
const loading = false;

<div>
  <label>
    is Loading:
    <input type="checkbox" @input="loading = !loading"/>
  </label>

  <br/>
  <br/>

  <BaseButton type="success" :isLoading="loading">Loading button</BaseButton>
  <BaseButton type="neutral" :isLoading="loading">Loading button</BaseButton>
</div>
```


### Button with icon

Add a icon in button

```js
  const getIcon = (icons, name) => icons.find((icon) => icon.id === `${name}.icon`);

  <div>
      <BaseButton size="small" :icon="getIcon(icons, 'info')" type="success">Button success</BaseButton>
      <BaseButton size="medium" :icon="getIcon(icons, 'cancel')" type="neutral">Button success</BaseButton>
      <BaseButton size="large" :icon="getIcon(icons, 'change')" type="warning">Button success</BaseButton>
  </div>
```