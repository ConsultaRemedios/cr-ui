A loader that can be used anywhere.

```js
new Vue({
  data(){
    return { isLoading: false };
  },

  methods: {
    toggleLoader() {
      this.isLoading = !this.isLoading;
    }
  },

  template: `
    <div>
      <BaseButton @click="toggleLoader">Toggle SimpleLoader</BaseButton>
      <SimpleLoader v-if="isLoading" />
    </div>
  `
})
```

You can pass a message too.

```js
new Vue({
  data(){
    return { isLoading: false };
  },

  methods: {
    toggleLoader() {
      this.isLoading = !this.isLoading;
    }
  },

  template: `
    <div>
      <BaseButton @click="toggleLoader">Toggle SimpleLoader</BaseButton>
      <SimpleLoader v-if="isLoading">Loading...</SimpleLoader>
    </div>
  `
})
```
