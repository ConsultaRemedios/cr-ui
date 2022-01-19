<template>
  <div
    class="row"
    :class="$style.wrapper"
  >
    <div
      v-if="userLogged"
      class="col-xs-12"
    >
      <div v-if="hasAddress">
        <span :class="$style.titleDefaultAddress">Em um dos seus endereços:</span>
        <div
          v-for="address in addresses"
          :key="address.id"
          :class="[$style.addressWrapper,
                   {[$style.checkedDefaultAddress]: addressIsChecked(address)}]
          "
          @click="setAddress(address)"
        >
          <BaseRadioButton
            :checked="addressIsChecked(address)"
            :class="$style.radiobutton"
            :value="address.zipcode"
            :name="address.name"
          />
          <div>
            <span :class="$style.address">{{ addressTitle(address) }}</span>
            <span :class="$style.nameAddress">
              {{ addressSubtitle(address) }}
            </span>
            <span v-if="haveReceiverName(address)" :class="$style.nameAddress">
              {{ receiverInformation(address) }}
            </span>
          </div>
        </div>

        <BaseButton
          type="naked"
          :class="$style.editMyAddress"
          @click="$emit('link-update-address')"
        >
          Editar endereço
        </BaseButton>

        <div
          v-if="!isMobile"
          :class="$style.footerLabel"
        >
          Em outro endereço
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breakpointable from '../../../mixins/breakpointable';
import BaseRadioButton from '../BaseRadioButton';
import BaseButton from '../BaseButton';

export default {
  name: 'AddressList',

  components: {
    BaseRadioButton,
    BaseButton,
  },

  mixins: [breakpointable],

  props: {
    userLogged: {
      type: Boolean,
      default: false,
    },

    isMobile: {
      type: Boolean,
      default: false,
    },

    zipcode: {
      type: Object,
      required: true,
    },

    addresses: {
      type: Array,
      required: true,
    },
  },

  computed: {
    hasAddress() {
      return this.addresses.length > 0;
    },
  },

  methods: {
    addressIsChecked(address) {
      return this.zipcode.addressId === address.id;
    },

    addressTitle(address) {
      return `${address.street}, ${address.number} ${address.neighborhood}`;
    },

    addressSubtitle({ zipcode, city, state }) {
      return `CEP ${zipcode} - ${city} - ${state}`;
    },

    haveReceiverName(address) {
      return address.firstName && address.lastName;
    },

    receiverInformation(address) {
      const phone = address.phone ? `- ${address.phone}` : '';

      return `${address.firstName} ${address.lastName} ${phone}`;
    },

    setAddress(address) {
      if (this.addressIsChecked(address)) return;

      const params = {
        addressId: address.id,
        zipcode: address.zipcode,
      };

      this.$emit('set-address', params);
    },
  },
};
</script>

<style module>
  @value media-md from './../../../styles/variables.css';

  .wrapper {
    font-family: Helvetica;
    padding: 0 20px 20px;
  }

  .addressesTitle {
    display: block;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
  }

  .addressesSubTitle {
    display: block;
    font-size: 14px;
    margin-top: 5px;
  }

  .loginButton {
    margin-bottom: 15px;
    margin-top: 20px;
  }

  button.loginButton a { /* stylelint-disable-line selector-no-qualifying-type */
    color: #fff;
  }

  button.loginButton a:hover { /* stylelint-disable-line selector-no-qualifying-type */
    background-color: var(--link-color-active);
    border-color: var(--link-color-active);
    color: #fff;
  }

  .registrationButton {
    background: #fff;
    border: 1px solid var(--link-color);
    border-radius: 4px;
    font-size: 16px;
    line-height: 44px;
  }

  .registrationButton a {
    color: var(--link-color);
  }

  button.registrationButton a:hover { /* stylelint-disable-line selector-no-qualifying-type */
    background-color: var(--link-color);
    color: #fff;
    font-size: 16px;
  }

  .titleDefaultAddress {
    display: block;
    font-size: 16px;
    font-weight: bold;
    height: 20px;
    margin: 16px 0;
  }

  .addressWrapper {
    border: 1px solid rgba(210, 218, 218, 0.7);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    margin-top: 8px;
    padding: 14px 16px 18px;
  }

  .addressWrapper span {
    display: block;
  }

  .editMyAddress {
    height: 44px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 15px;
    padding-left: 16px;
    color: var(--link-color);
  }

  .checkedDefaultAddress {
    border: 1px solid var(--color-dark-green);
  }

  .labelCheckbox {
    cursor: pointer;
    margin: 0;
    margin-right: 10px;
    margin-top: 2px;
  }

  .checkmark {
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 50%;
    height: 20px;
    left: 0;
    position: relative;
    top: 0;
    width: 20px;
  }

  .input {
    cursor: pointer;
    height: 0;
    opacity: 0;
    position: absolute;
    width: 0;
  }

  .input:checked ~ .checkmark {
    background-color: var(--link-color);
    border: 1px solid var(--link-color);
  }

  .input:checked ~ .checkmark::after {
    display: block;
    transform: scale(1);
  }

  .checkmark::after {
    content: '';
    display: none;
    position: relative;
  }

  .input:checked ~ .checkmark::after {
    border: solid #fff;
    border-width: 0 2px 2px 0;
    height: 10px;
    left: 6px;
    top: 3px;
    transform: rotate(45deg);
    transform: rotate(45deg);
    transform: rotate(45deg);
    width: 5px;
  }

  .nameAddress {
    color: #646363;
    font-size: 16px;
  }

  .address {
    color: #333;
    font-size: 18px;
    font-weight: bold;
  }

  .radiobutton {
    align-items: center;
    display: flex;
    justify-content: center;
    padding-right: 10px;
  }

  .footerLabel {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: -20px;
    margin-top: 10px;
  }

  @media media-md {
    .wrapper {
      padding: 0 20px;
    }
  }
</style>
