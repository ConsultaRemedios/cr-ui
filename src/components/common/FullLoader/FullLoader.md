As the name says, a full loader component!

```js
new Vue({
  data(){
    return { isLoading: false };
  },
  methods: {
    showLoader() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  },
  template: `
    <div>
      <BaseButton @click="showLoader">Show FullLoader</BaseButton>
      <FullLoader :show="isLoading" text="Loading example"/>
    </div>
  `
})
```
