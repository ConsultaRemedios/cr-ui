ZipcodeForm is a component used to search the zipcode by number or geolocation.

```js
new Vue({
  data(){
    return {
      zipcodeValue: '',
      numberValue: '',  
      shouldLoadButton: false,
      address: '',
      isLoaded: true,
      hasError: false,
      addresses: [],
      errorMessage: 'Dados Inválidos',
      textPlaceholder: '',
      autocompleteExpanded: false,
      showPlaceholderSuggestion: false,
    };
  },
  methods: {
    cancel() {
      alert('cancel event triggered!');
    },
    searchZipcode() {
      alert('search event triggered!');
    },
    saveZipcode() {
      alert('save event triggered!');
    },
    clearZipcode() {
      alert('clearZipcode event triggered!');
    },
    geolocationError() {
      alert('geolocationError event triggered!');
    },
    onSelected() {
      this.autocompleteExpanded = false;
    },
    showError() {
      this.hasError = true;
      this.errorMessage = 'Erro';
    },
    onClose() {
      this.autocompleteExpanded = false;
    },
    getSuggestions({ value }) {
      this.autocompleteExpanded = true;

      const fetchResult = [
        {
          "zipcode":"01007020",
          "fullAddress":"01007020 - da Bandeira, Centro - São Paulo/SP",
          "shortAddress":"01007020 - Centro - São Paulo/SP",
          "state":"SP",
        },
        {
          "zipcode":"01007050",
          "fullAddress":"01007050 - Carlos Drummond de Andrade, Centro - São Paulo/SP",
          "short_address":"01007050 - Centro - São Paulo/SP",
          "state":"SP",
          },
      ];

      return fetchResult;
    },
  },
  template: `
    <div>
      <ZipcodeForm
        :zipcode="zipcodeValue"
        :number="numberValue"
        :is-loading="shouldLoadButton"
        :address="address"
        :has-error="hasError"
        :is-loaded="isLoaded"
        :addresses="addresses"
        :get-suggestions="getSuggestions"
        :text-placeholder="textPlaceholder"
        :error-message="errorMessage"
        :autocomplete-expanded="autocompleteExpanded"
        :show-placeholder-suggestion="showPlaceholderSuggestion"
        @error="showError"
        @selected="onSelected"
        @close="onClose"
        @cancel="cancel"
        @search="searchZipcode"
        @save="saveZipcode"
        @clearZipcode="clearZipcode"
        @geolocationError="geolocationError"
      />
    </div>
  `
})
```
