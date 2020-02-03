
### Basic Usage

```js
  const getSuggestions = () => [
    { name: 'Dorspan 25mg', id: 0 },
    { name: 'Dorspan 50mg', id: 1 },
    { name: 'Dorspan 150mg', id: 2 },
    { name: 'Dorspan 125mg', id: 3 }
  ];

  <Autocomplete
    :get-suggestions="getSuggestions"
    suggestions-key="id"
    placeholderInput="I am an placeholder"
  />
```

### Custom input and list items with slots

```js

  new Vue({
    methods: {
      getSuggestions() {
        return [
          { name: 'Dorspan 25mg', id: 0, type: 'Medicamento' },
          { name: 'Dorspan 50mg', id: 1, type: 'Generico' },
          { name: 'Dorspan 150mg', id: 2, type: 'Similar' },
          { name: 'Dorspan 125mg', id: 3, type: 'Outro' }
        ];
      }
    },
    template: `
      <div>
        <Autocomplete
          :get-suggestions="getSuggestions"
          suggestions-key="id"
          placeholderInput="I am an placeholder"
        >
          <template
            slot="input"
            slot-scope="{ term, onChange, onFocus, onKeyDown, onClose }"
          >
            <BaseInput
              :value="term"
              type="search"
              @change="onChange"
              @focus="onFocus"
              @keydown="onKeyDown"
            />
          </template>

          <template
            slot="listItem"
            slot-scope="{ suggestion }"
          >
            <div :style="{ display: 'flex', 'flex-direction': 'column' }">
              <span>{{ suggestion.name }}</span>
              <span :style="{ 'margin-top': '3px', color: '#595959' }">{{ suggestion.type }}</span>
            </div>
          </template>
        </Autocomplete>
      </div>
    `,
})
```
