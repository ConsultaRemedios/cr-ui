RemovedItemsMOdal is a component the displays the stores with itens removeds in cart.

```js
new Vue({
  data() {
    return {
      stores: [
        {
          name: 'Loja 1',
          logo: 'http://domain.com/logo.png',
          id: 1,
          items: [
            {
              removedQuantity: 2,
              remainingQuantity: 97,
              name: 'Mucosolvan',
              variation: '30mg/5ml, xarope, frasco com 120ml',
              image: 'http://domain.com/image.png',
            },
            {
              removedQuantity: 2,
              remainingQuantity: 0,
              name: 'Tylenol',
              variation: '750mg, caixa com 20 comprimidos revestidos',
              image: 'http://domain.com/image-02.png',
            },
          ],
        },
      ],
      ui: {
        isOpen: false,
      }
    };
  },
  methods: {
    openModal() {
      this.ui.isOpen = true;
    },

    closeModal() {
      this.ui.isOpen = false;
    },
  },
  template: `
    <div>
      <BaseButton @click="openModal">Toggle StoreModal</BaseButton>
      <RemovedItemsModal
        :show="ui.isOpen"
        :stores="stores"
        @close="closeModal"
      />
    </div>
  `
})
```

RemovedItemsModal with custom action button label

```js
new Vue({
  data() {
    return {
      stores: [
        {
          name: 'Loja 1',
          logo: 'http://domain.com/logo.png',
          id: 1,
          items: [
            {
              removedQuantity: 2,
              remainingQuantity: 97,
              name: 'Mucosolvan',
              variation: '30mg/5ml, xarope, frasco com 120ml',
              image: 'http://domain.com/image.png',
            },
            {
              removedQuantity: 2,
              remainingQuantity: 0,
              name: 'Tylenol',
              variation: '750mg, caixa com 20 comprimidos revestidos',
              image: 'http://domain.com/image-02.png',
            },
          ],
        },
      ],
      actionLabel: 'Continuar checkout',
      ui: {
        isOpen: false,
      }
    };
  },
  methods: {
    openModal() {
      this.ui.isOpen = true;
    },

    closeModal() {
      this.ui.isOpen = false;
    },
  },
  template: `
    <div>
      <BaseButton @click="openModal">Toggle StoreModal</BaseButton>
      <RemovedItemsModal
        :show="ui.isOpen"
        :stores="stores"
        :actionLabel="actionLabel"
        @close="closeModal"
      />
    </div>
  `
})
```
