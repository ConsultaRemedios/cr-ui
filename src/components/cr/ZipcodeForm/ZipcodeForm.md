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
    error() {
      alert('error event triggered!');
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
        @cancel="cancel"
        @search="searchZipcode"
        @save="saveZipcode"
        @clearZipcode="clearZipcode"
        @geolocationError="error"
      />
    </div>
  `
})
```
