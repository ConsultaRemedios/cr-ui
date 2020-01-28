<template>
  <div :class="$style.wrapper">
    <BaseInput
      :name="name"
      type="tel"
      @change="onChange"
      @blur="onBlur"
      :value="currentValue"
      :has-error="hasError"
      :custom-style="{ paddingRight: '46px' }"
      v-bind="$attrs"
    />

    <img
      v-if="brandIcon"
      :class="$style.brandIcon"
      :src="brandIcon"
    />
  </div>
</template>

<script>
  import getCreditCardInfo from './../../../helpers/credit-card-info';
  import BaseInput from '../BaseInput';

  import visa from './../../../assets/credit-card-brands/visa.png';
  import mastercard from './../../../assets/credit-card-brands/mastercard.png';
  import discover from './../../../assets/credit-card-brands/discover.png';
  import jcb from './../../../assets/credit-card-brands/jcb.png';
  import americanExpress from './../../../assets/credit-card-brands/american-express.png';
  import dinersClub from './../../../assets/credit-card-brands/diners-club.png';
  import hipercard from './../../../assets/credit-card-brands/hipercard.png';
  import elo from './../../../assets/credit-card-brands/elo.png';
  import maestro from './../../../assets/credit-card-brands/maestro.png';

  export default {
    inheritAttrs: false,
    name: 'CreditCardField',

    props: {
      name: {
        type: String,
        default: '',
      },

      value: {
        type: String,
        default: '',
      },

      hasError: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return { brand: '', currentValue: this.value };
    },

    components: { BaseInput },

    watch: {
      value(newValue) {
        this.currentValue = newValue;
      },
    },

    methods: {
      onBlur(e) {
        const { formattedValue, brand } = getCreditCardInfo(e.value);

        this.$emit('blur', {
          ...e,
          value: formattedValue,
          brand,
        });
      },

      onChange(e) {
        const { formattedValue, brand } = getCreditCardInfo(e.value);

        this.currentValue = e.value;
        this.brand = brand;

        this.$nextTick(() => {
          this.currentValue = formattedValue;

          if (this.value === formattedValue) return;

          this.$emit('change', {
            ...e,
            value: formattedValue,
            brand,
          });
        });
      },
    },

    computed: {
      brandIcon() {
        const icons = {
          'american-express': americanExpress,
          'diners-club': dinersClub,
          discover,
          elo,
          hipercard,
          jcb,
          maestro,
          mastercard,
          visa,
        };

        return icons[this.brand];
      },
    },
  };
</script>

<style module>
  .wrapper {
    position: relative;
  }

  .brandIcon {
    position: absolute;
    background: #CCC;
    text-align: center;
    text-transform: uppercase;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
  }
</style>
