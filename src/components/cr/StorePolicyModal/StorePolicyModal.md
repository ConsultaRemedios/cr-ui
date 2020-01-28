StorePolicyModal is a component the displays the store information in a modal.

```js
const information = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sit amet nisl at laoreet. Fusce at turpis maximus, mollis purus nec, dictum nisi. Ut maximus semper viverra. Morbi porta scelerisque mi, id scelerisque risus iaculis ut. Nulla mollis dapibus nulla, a dictum lorem egestas eget. Sed vehicula tortor eu condimentum pellentesque. Morbi accumsan pellentesque lacus ut aliquet. Donec vel ligula non sapien euismod mollis. Nulla ac enim interdum ligula ullamcorper fermentum eget eget lacus. Nullam eget rutrum nibh.</p>
<p>Aenean et dui laoreet, vehicula nunc et, convallis sapien. In consequat, urna et ornare vehicula, lectus ipsum tempus ante, id accumsan massa purus at lectus. Cras quis libero nibh. Mauris bibendum justo et volutpat dignissim. Vivamus non mauris ac diam ultrices pretium eget vel justo. Maecenas sapien eros, lobortis ut lorem gravida, maximus ultrices risus. Mauris volutpat est ligula, eu convallis urna egestas eleifend. In ornare sem mattis, tempor eros varius, lobortis nunc. In hac habitasse platea dictumst. Nullam dignissim velit id risus tristique congue.</p>
<p>Proin aliquet libero a erat tincidunt rutrum. Maecenas egestas egestas lorem, quis venenatis nisl fermentum nec. Morbi semper neque in lacus commodo dictum. Sed et sapien ipsum. Ut consequat lectus vel nibh laoreet, id viverra ante faucibus. Cras risus velit, consectetur eget convallis sed, aliquet at odio. Vestibulum pharetra, sapien facilisis fermentum consectetur, metus odio molestie lorem, et aliquam risus lorem eget odio. Nulla porta efficitur auctor. Proin magna metus, egestas a sem a, volutpat ultrices metus.</p>
<p>Integer maximus sem varius tellus blandit ullamcorper. Donec sodales vestibulum pretium. Pellentesque et mauris pellentesque, tincidunt turpis non, malesuada purus. Donec blandit nisi et ultrices ultrices. Mauris suscipit consequat odio. In tristique eu justo non auctor. Mauris purus urna, elementum sed iaculis vel, cursus non neque. Morbi in ex et lacus faucibus ullamcorper et eget purus. Integer imperdiet ligula tincidunt, euismod eros quis, gravida purus. Cras a diam quis augue laoreet ultricies vel quis libero.</p>
<p>Donec et interdum sapien, vel varius diam. Suspendisse potenti. Suspendisse egestas sagittis turpis, a pulvinar sapien tincidunt vitae. Maecenas egestas sapien enim, sit amet mollis orci dictum elementum. Fusce ut gravida orci, vitae fermentum neque. Proin quis est sit amet tortor consequat dapibus a gravida sapien. Pellentesque mollis pharetra finibus. Vivamus id neque in ipsum condimentum cursus. In imperdiet sem eu orci mollis mollis.</p>`;

new Vue({
  data() {
    return {
      store: {
        title: 'Política de Entrega',
        name: 'Store example',
        logoPath: 'https://via.placeholder.com/130x74',
        information,
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
      <BaseButton @click="openModal">Toggle StorePolicyModal</BaseButton>
      <StorePolicyModal
        v-if="ui.isOpen"
        :title="store.title"
        :name="store.name"
        :logoPath="store.logoPath"
        :information="store.information"
        @close="closeModal"
      />
    </div>
  `
})
```

In case you don't have the information about the store yet you can set the loading status and fetch the information.

```js
const information = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sit amet nisl at laoreet. Fusce at turpis maximus, mollis purus nec, dictum nisi. Ut maximus semper viverra. Morbi porta scelerisque mi, id scelerisque risus iaculis ut. Nulla mollis dapibus nulla, a dictum lorem egestas eget. Sed vehicula tortor eu condimentum pellentesque. Morbi accumsan pellentesque lacus ut aliquet. Donec vel ligula non sapien euismod mollis. Nulla ac enim interdum ligula ullamcorper fermentum eget eget lacus. Nullam eget rutrum nibh.</p>
<p>Aenean et dui laoreet, vehicula nunc et, convallis sapien. In consequat, urna et ornare vehicula, lectus ipsum tempus ante, id accumsan massa purus at lectus. Cras quis libero nibh. Mauris bibendum justo et volutpat dignissim. Vivamus non mauris ac diam ultrices pretium eget vel justo. Maecenas sapien eros, lobortis ut lorem gravida, maximus ultrices risus. Mauris volutpat est ligula, eu convallis urna egestas eleifend. In ornare sem mattis, tempor eros varius, lobortis nunc. In hac habitasse platea dictumst. Nullam dignissim velit id risus tristique congue.</p>
<p>Proin aliquet libero a erat tincidunt rutrum. Maecenas egestas egestas lorem, quis venenatis nisl fermentum nec. Morbi semper neque in lacus commodo dictum. Sed et sapien ipsum. Ut consequat lectus vel nibh laoreet, id viverra ante faucibus. Cras risus velit, consectetur eget convallis sed, aliquet at odio. Vestibulum pharetra, sapien facilisis fermentum consectetur, metus odio molestie lorem, et aliquam risus lorem eget odio. Nulla porta efficitur auctor. Proin magna metus, egestas a sem a, volutpat ultrices metus.</p>
<p>Integer maximus sem varius tellus blandit ullamcorper. Donec sodales vestibulum pretium. Pellentesque et mauris pellentesque, tincidunt turpis non, malesuada purus. Donec blandit nisi et ultrices ultrices. Mauris suscipit consequat odio. In tristique eu justo non auctor. Mauris purus urna, elementum sed iaculis vel, cursus non neque. Morbi in ex et lacus faucibus ullamcorper et eget purus. Integer imperdiet ligula tincidunt, euismod eros quis, gravida purus. Cras a diam quis augue laoreet ultricies vel quis libero.</p>
<p>Donec et interdum sapien, vel varius diam. Suspendisse potenti. Suspendisse egestas sagittis turpis, a pulvinar sapien tincidunt vitae. Maecenas egestas sapien enim, sit amet mollis orci dictum elementum. Fusce ut gravida orci, vitae fermentum neque. Proin quis est sit amet tortor consequat dapibus a gravida sapien. Pellentesque mollis pharetra finibus. Vivamus id neque in ipsum condimentum cursus. In imperdiet sem eu orci mollis mollis.</p>`;

const storeInfo = {
  name: 'Store example',
  logoPath: 'https://via.placeholder.com/130x74',
  information,
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
        information: '',
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
        .then((response) => {
          this.store = { ...response };

          this.ui.isLoading = false;
        });
    },

    closeModal() {
      this.ui.isOpen = false;
      this.ui.isLoading = false;
      this.store = {
        name: '',
        logoPath: '',
        information: '',
      };
    },
  },
  template: `
    <div>
      <BaseButton @click="openModal">Toggle StorePolicyModal</BaseButton>
      <StorePolicyModal
        v-if="ui.isOpen"
        :name="store.name"
        :logoPath="store.logoPath"
        :information="store.information"
        :isLoading="ui.isLoading"
        @close="closeModal"
      />
    </div>
  `
})
```
