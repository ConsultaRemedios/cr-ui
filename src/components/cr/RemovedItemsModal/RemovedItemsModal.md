RemovedItemsMOdal is a component the displays the stores with itens removeds in cart.

```js
new Vue({
  data() {
    return {
      stores: [{
        name: 'Store example',
        logoPath: 'https://via.placeholder.com/130x74',
        informations: [{
          title: 'Farmacêutico responsável',
          content: 'Ely Fernandes Lima<br />CRF/PR: 15448'
        }, {
          title: 'Atendimento',
          content: '(51) 3481-9500<br />sac@grupodimed.com.br'
        },
        {
          title: 'Dados da loja',
          content: '<p>Raia Drogasil SA | DROGA RAIA ↵<br />CNPJ: 61.585.865/0240-93↵<br />Endereço: Av. Nsa. Sra. Assunção, 638 | Butantã | São Paulo (SP) | CEP 05359-001↵<br />Autorização de Funcionamento: AFE: 7.17094.5 | CMVS - 355030801-477-002443-1-7 ↵</p>'
        }],
      }],
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
      stores: [{
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
      }],
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
