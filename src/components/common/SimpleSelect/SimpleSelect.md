SimpleSelect is a simple select component. We use the native options instead of simulating it
through a fake dropdown. Compared to BaseSelect, it is not so flexible, but it provides a better
accessibility, user experience and it is simpler to use.

```js
let data = { selected: 'f' };

const options = [
  { label: 'Feminino', value: 'f' },
  { label: 'Masculino', value: 'm' }
];

const onChange = (e) => {
  data.selected = e.value;
};

<div>
  <strong>Selected value:</strong> {{ data.selected }}

  <br/>
  <br/>

  <SimpleSelect
    name="gender"
    :options="options"
    :selected="data.selected"
    @change="onChange"
  />
</div>
```
