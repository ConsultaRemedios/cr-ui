StoreModal is a component the displays the store information in a modal.

```js
new Vue({
  data() {
    return {
      store: {
        name: 'Store example',
        logoPath: 'https://via.placeholder.com/130x74',
        informations: [{
          title: 'Panvel Farmácias',
          content: 'Dimed S/A Distribuidora de Medicamentos<br />CNPJ 92.665.611/0001-77<br />AFE: 7.17094.5 <br />CMVS - 355030801-477-002443-1-7'
        }, {
          title: 'Farmacêutico responsável',
          content: 'Ely Fernandes Lima<br />CRF/PR: 15448'
        }, {
          title: 'Horário de funcionamento',
          content: 'Segunda a Sexta <br />8h00 às 20h30<br />Av. Industrial Belgraf, 865 Eldorado do Sul, Rio Grande do Sul'
        }, {
          title: 'Atendimento',
          content: '(51) 3481-9500<br />sac@grupodimed.com.br'
        }],
      },
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
      <StoreModal
        v-if="ui.isOpen"
        :name="store.name"
        :logoPath="store.logoPath"
        :informations="store.informations"
        @close="closeModal"
      />
    </div>
  `
})
```

In case you don't have the information about the store yet you can set the loading status and fetch the information.

```js
const storeInfo = {
  name: 'Store example',
  logoPath: 'https://via.placeholder.com/130x74',
  informations: [{
    title: 'Panvel Farmácias',
    content: 'Dimed S/A Distribuidora de Medicamentos<br />CNPJ 92.665.611/0001-77<br />AFE: 7.17094.5 <br />CMVS - 355030801-477-002443-1-7'
  }, {
    title: 'Farmacêutico responsável',
    content: 'Ely Fernandes Lima<br />CRF/PR: 15448'
  }, {
    title: 'Horário de funcionamento',
    content: 'Segunda a Sexta <br />8h00 às 20h30<br />Av. Industrial Belgraf, 865 Eldorado do Sul, Rio Grande do Sul'
  }, {
    title: 'Atendimento',
    content: '(51) 3481-9500<br />sac@grupodimed.com.br'
  }],
};

const makeFetch = () => new Promise(resolve => {
  setTimeout(() => {
    resolve(storeInfo);
  }, 1000);
});

new Vue({
  data() {
    return {
      store: {
        name: '',
        logoPath: '',
        informations: [],
      },
      ui: {
        isLoading: false,
        isOpen: false
      },
    };
  },
  methods: {
    openModal() {
      this.ui.isOpen = true;
      this.ui.isLoading = true;

      makeFetch()
        .then(({ name, logoPath, informations }) => {
          this.store.name = name;
          this.store.logoPath = logoPath;
          this.store.informations = informations;

          this.ui.isLoading = false;
        });
    },

    closeModal() {
      this.ui.isOpen = false;
      this.ui.isLoading = false;
      this.store = {
        name: '',
        logoPath: '',
        informations: [],
      };
    },
  },
  template: `
    <div>
      <BaseButton @click="openModal">Toggle StoreModal</BaseButton>
      <StoreModal
        v-if="ui.isOpen"
        :name="store.name"
        :logoPath="store.logoPath"
        :informations="store.informations"
        :isLoading="ui.isLoading"
        @close="closeModal"
      />
    </div>
  `
})
```

Store modal with link that opens the store page with its own products

```js
new Vue({
  data() {
    return {
      store: {
        name: 'Store example',
        logoPath: 'https://via.placeholder.com/130x74',
        informations: [{
          title: 'Panvel Farmácias',
          content: 'Dimed S/A Distribuidora de Medicamentos<br />CNPJ 92.665.611/0001-77<br />AFE: 7.17094.5 <br />CMVS - 355030801-477-002443-1-7'
        }, {
          title: 'Farmacêutico responsável',
          content: 'Ely Fernandes Lima<br />CRF/PR: 15448'
        }, {
          title: 'Horário de funcionamento',
          content: 'Segunda a Sexta <br />8h00 às 20h30<br />Av. Industrial Belgraf, 865 Eldorado do Sul, Rio Grande do Sul'
        }, {
          title: 'Atendimento',
          content: '(51) 3481-9500<br />sac@grupodimed.com.br'
        }],
      },
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
      <StoreModal
        v-if="ui.isOpen"
        :name="store.name"
        :logoPath="store.logoPath"
        :informations="store.informations"
        @close="closeModal"
      >
        <div style="margin-left: -18px;">
          <BaseButton type=naked path="#" rel="nofollow">Veja todas as ofertas desta loja</BaseButton>
        </div>
      </StoreModal>
    </div>
  `
})
```
