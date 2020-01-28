SearchInput is a search input component.
This component just search on enter or on click in search button.

```js
const showClearButton = () => {
  return Boolean(window.location.search);
} ;

const onClickClearButton = () => {
  window.location.assign(`${window.location.pathname}`);
};

const getValue = () => {
  let searchValue = window.location.search.substring(7);
  let value = searchValue.replace(/\+/g, ' ');
  return value;
}

const onSubmitInput = ({ value }) => {
  const searchValue = value.replace(/ /g, '+');
  window.location.assign(`${window.location.pathname}?termo=${searchValue}`);
};

<div>
  <SearchInput
    placeholder="Buscando um pedido específico?"
    :value="getValue()"
    :show-clear-button="showClearButton()"
    @click-clear-button=onClickClearButton
    @submit="onSubmitInput"
  />
</div>
```

Another example

```js
new Vue({
  data() {
    return {
      ui: {
        showClearButton: false,
      }
    };
  },
  methods: {
    toggleClearButton() {
      this.ui.showClearButton = !this.ui.showClearButton;
    },

    onClickClearButton() {
      alert('Clicked clear button');
    },

    onSubmit({ value }) {
      alert(`Submitted with value: ${value}`);
    },
  },
  template: `
    <div>
      <BaseButton
        :style="{ marginBottom: '10px' }"
        @click="toggleClearButton"
      >
        Toggle Clear Button
      </BaseButton>

      <SearchInput
        placeholder="Digite algo"
        :show-clear-button="ui.showClearButton"
        @click-clear-button=onClickClearButton
        @submit="onSubmit"
      />
    </div>
  `
})
```
