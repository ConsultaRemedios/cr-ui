### Basic Usage
```js
const options = [
  { label: 'Brasil', value: 1 },
  { label: 'Estados Unidos', value: 2 },
  { label: 'Inglaterra', value: 3 },
  { label: 'China', value: 4 },
  { label: 'Argentina', value: 5 },
  { label: 'Chile', value: 6 },
  { label: 'Nova Zelândia', value: 7 },
  { label: 'França', value: 8 },
  { label: 'Itália', value: 9 },
  { label: 'Dinamarca', value: 10 },
];

<BaseSelect
  :options="options"
  placeholder="Selecione um país"
>
  <BaseOption v-for="option in options"
    :value="option.value"
    :key="option.value"
  >
    {{option.label}}
  </BaseOption>
</BaseSelect>
```

### With Error
```js
const options = [
  { label: 'Brasil', value: 1 },
  { label: 'Estados Unidos', value: 2 },
  { label: 'Inglaterra', value: 3 },
  { label: 'China', value: 4 },
  { label: 'Argentina', value: 5 },
  { label: 'Chile', value: 6 },
  { label: 'Nova Zelândia', value: 7 },
  { label: 'França', value: 8 },
  { label: 'Itália', value: 9 },
  { label: 'Dinamarca', value: 10 },
];

<BaseSelect
  :options="options"
  :has-error="true"
>
  <BaseOption v-for="option in options"
    :value="option.value"
    :key="option.value"
  >
    {{option.label}}
  </BaseOption>
</BaseSelect>
```

### Custom Select
If for some reason you need a custom select, you can do it.
Just provide a value propriety for the option objects and the others props
it's up to you. You just need some steps:

* Create option collection with the required value propriety
* Pass an object with the same option structure as placeholder prop
* Create a template for the selected option
* Pass the custom option template as the children of the option component

```
const options = [
  { title: 'Casa', description: 'Rua alameda dos anjos...', value: 'casa' },
  { title: 'Escritório', description: 'Rua das travessas...', value: 'office' },
];

const style = {
  title: { fontSize: '14px', margin: 0, fontWeight: 600 },
  description: { margin: '0', fontSize: '14px' },
};

<BaseSelect
  :options="options"
  :placeholder="{ title: 'Endereço', description: 'selecione um endereço' }"
  :rounded="false"
>
  <template slot="selected" scope="props">
    <h1 :style="{ ...style.title }">{{props.currentLabel.title}}</h1>
    <p :style="{ ...style.description }">{{props.currentLabel.description}}</p>
  </template>

  <BaseOption v-for="option in options"
    :value="option.value"
    :key="option.value"
  >
    <div>
      <h1 :style="{ ...style.title }">{{option.title}}</h1>
      <p :style="{ ...style.description }">{{option.description}}</p>
    </div>
  </BaseOption>
</BaseSelect>
```

#### With error
```
const options = [
  { title: 'Casa', description: 'Rua alameda dos anjos...', value: 'casa' },
  { title: 'Escritório', description: 'Rua das travessas...', value: 'office' },
];

const style = {
  title: { fontSize: '14px', margin: 0, fontWeight: 600 },
  description: { margin: '0', fontSize: '14px' },
};

<BaseSelect
  :options="options"
  :rounded="false"
  value="office"
  :has-error="true"
>
  <template slot="selected" scope="props">
    <h1 :style="{ ...style.title }">{{props.currentLabel.title}}</h1>
    <p :style="{ ...style.description }">{{props.currentLabel.description}}</p>
  </template>

  <BaseOption v-for="option in options"
    :value="option.value"
    :key="option.value"
  >
    <div>
      <h1 :style="{ ...style.title }">{{option.title}}</h1>
      <p :style="{ ...style.description }">{{option.description}}</p>
    </div>
  </BaseOption>
</BaseSelect>
```
