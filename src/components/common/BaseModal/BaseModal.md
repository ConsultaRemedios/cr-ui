A raw Modal component. This component does not control the style inside the modal. It just
renders a Modal with a close button (an icon).

### Usage normal
```js
new Vue({
  data(){
    return { showModal: false };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },
  },
  template: `
    <div>
      <BaseModal v-if="showModal" @close="closeModal">
        <div :style="{ padding: '20px' }">
          <h2>Base Modal</h2>
          <p>This is a raw base modal. It's uggly, I know.</p>
        </div>
      </BaseModal>

      <BaseButton @click="openModal">Open Modal</BaseButton>
    </div>
  `
})
```
### Usage footer modal
```js
new Vue({
  data(){
    return { showModal: false };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },
  },
  template: `
    <div>
      <BaseModal v-if="showModal" @close="closeModal" type="footer">
        <div :style="{ padding: '20px' }">
          <h2>Base Modal</h2>
          <p>This is a raw base modal. It's uggly, I know.</p>
        </div>
      </BaseModal>

      <BaseButton @click="openModal">Open Modal</BaseButton>
    </div>
  `
})
```

### Dismissible
You can set dismissible prop as `true` if you don't want a close button.
Also, The BaseModal component will not trigger `close` event when clicking on overlay.

```js
new Vue({
  data(){
    return { showModal: false };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },
  },
  template: `
    <div>
      <BaseModal v-if="showModal" :dismissible="false">
        <div :style="{ padding: '20px' }">
          <h2>Base Modal</h2>
          <p>This is a raw base modal. It's uggly, I know.</p>

          <BaseButton @click="closeModal">Close Modal</BaseButton>
        </div>
      </BaseModal>

      <BaseButton @click="openModal">Open Modal</BaseButton>
    </div>
  `
})
```
