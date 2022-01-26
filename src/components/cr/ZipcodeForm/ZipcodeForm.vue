<template>
  <div :class="$style.wrapper">
    <div :class="$style.fieldTitle">
      Informe seu CEP
    </div>

    <div :class="$style.fieldGroup">
      <div :class="[$style.inputBlock, $style.inputBlockZipcode]">
        <InputGroup :class="$style.inputBlockGroup">
          <BaseInput
            v-model="zipcodeValue"
            v-mask="'zipcode'"
            type="tel"
            name="zipcode"
            placeholder="Digite seu CEP"
            :classes="[$style.inputZipcode, { [$style.inputError]: hasError }]"
            @change="setZipcode"
          />
          <button
            v-if="hasError"
            :class="$style.buttonClearZipcode"
            @click="$emit('clearZipcode')"
          >
            <BaseIcon
              id="cancel.icon"
              :class="[$style.icon, $style.iconError]"
            />
          </button>

          <button
            v-else-if="hasLocationApi"
            :class="$style.buttonFindLocation"
            @click="getGeolocation()"
          >
            <BaseIcon
              id="find-location.icon"
              :class="$style.icon"
            />
          </button>
        </InputGroup>
        <div
          v-if="hasError && isMobile"
          :class="$style.fieldError"
        >
          Dados inválidos
        </div>
      </div>
      <div :class="[$style.inputBlock, $style.inputBlockNumber]">
        <InputGroup
          :class="[$style.inputGroup, {[$style.fieldNumberDisabled]: withoutNumber}]"
        >
          <BaseInput
            :class="$style.inputNumber"
            :disabled="withoutNumber"
            :value="numberValue"
            type="tel"
            name="number"
            placeholder="Número"
            @change="setNumber"
          />
          <BaseCheckbox
            :class="$style.baseCheckbox"
            name="withoutNumber"
            value="on"
            label="Sem número"
            :checked="numberFieldDisabled || withoutNumber"
            @change="onChangeCheckbox"
          />
        </InputGroup>

        <div
          v-if="address && isMobile"
          :class="$style.fieldAddress"
        >
          {{ address }}
        </div>
      </div>
      <div
        v-if="!isMobile"
        :class="$style.submitBlock"
      >
        <BaseButton
          type="info"
          :is-loading="shouldLoadButton"
          :fill="true"
          @click="onClickSubmit"
        >
          Usar
        </BaseButton>
      </div>
    </div>

    <div
      v-if="hasError && !isMobile"
      :class="$style.fieldError"
    >
      Dados inválidos
    </div>

    <div
      v-else-if="address && !isMobile"
      :class="$style.fieldAddress"
    >
      {{ address }}
    </div>

    <div :class="$style.buttonsAction">
      <div
        v-if="isMobile"
        :class="$style.submitBlock"
      >
        <BaseButton
          type="info"
          :is-loading="shouldLoadButton"
          :fill="true"
          @click="onClickSubmit"
        >
          Usar
        </BaseButton>
      </div>

      <BaseButton
        v-if="isLoaded"
        type="info"
        title="Cancelar"
        :class="$style.buttonCancel"
        @click="$emit('cancel')"
      >
        Cancelar
      </BaseButton>

      <BaseButton
        v-if="isLoaded"
        type="neutral"
        title="Salvar e prosseguir"
        :class="$style.buttonSave"
        @click="onClickSave()"
      >
        Salvar e prosseguir
      </BaseButton>
    </div>
    <div
      v-if="!hasAddress"
      :class="$style.footerInfo"
    >
      <p :class="$style.footerInfoTitle">
        Não sabe seu CEP?
      </p>
      <BaseButton
        :open-new-tab="true"
        :class="$style.findZipcodeButton"
        type="naked"
        path="http://www.buscacep.correios.com.br/sistemas/buscacep/"
      >
        Buscar no site dos Correios
      </BaseButton>
    </div>
  </div>
</template>

<script>
import VMasker from 'vanilla-masker';
import { zipcode as zipcodeFilter } from '../../../filters';
import BaseIcon from '../../common/BaseIcon';
import BaseInput from '../../common/BaseInput';
import BaseButton from '../../common/BaseButton';
import InputGroup from '../../common/InputGroup';
import BaseCheckbox from '../../common/BaseCheckbox';
import mask from '../../../directives/mask';
import breakpointable from '../../../mixins/breakpointable';

export default {
  name: 'ZipcodeForm',
  components: {
    BaseIcon, BaseInput, BaseButton, InputGroup, BaseCheckbox,
  },
  directives: { mask },
  filters: { zipcode: zipcodeFilter },
  mixins: [breakpointable],
  props: {
    zipcode: {
      type: [Number, String],
      default: null,
    },

    address: {
      type: String,
      default: '',
    },

    number: {
      type: [Number, String],
      default: null,
    },

    hasError: {
      type: Boolean,
      default: false,
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    isLoaded: {
      type: Boolean,
      default: false,
    },

    addresses: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      lat: null,
      lng: null,
      zipcodeValue: '',
      numberValue: null,
      numberFieldDisabled: false,
    };
  },

  computed: {
    isMobile() {
      return this.breakpoint === 'xs';
    },
    shouldLoadButton() {
      return this.isLoading;
    },
    hasLocationApi() {
      return !!navigator.geolocation;
    },
    hasAddress() {
      return this.addresses.length > 0;
    },
    withoutNumber() {
      return this.numberValue === 'S/N';
    },
  },

  watch: {
    zipcode() {
      this.zipcodeValue = VMasker.toPattern(this.zipcode, '99999-999');
    },
    number() {
      this.numberValue = this.number;
    },
  },

  mounted() {
    this.zipcodeValue = VMasker.toPattern(this.zipcode, '99999-999');
    this.numberValue = this.number;
  },

  methods: {
    setZipcode(zipcode) {
      if (zipcode.length < 9) return;
      this.zipcodeValue = zipcode.value;
    },
    setNumber(number) {
      this.numberValue = number.value;
    },
    onChangeCheckbox({ value }) {
      this.numberValue = value ? 'S/N' : '';
    },
    getGeolocation() {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position;
          this.lat = coords.latitude;
          this.lng = coords.longitude;
          this.onClickSubmit();
        },
        (error) => {
          this.$emit('geolocationError', error);
        },
        options,
      );
    },

    onClickSubmit() {
      if (this.lat && this.lng) {
        this.$emit('search', {
          zipcode: this.zipcodeValue,
          number: this.numberValue,
          lat: this.lat,
          lng: this.lng,
        });
        return;
      }

      if (this.zipcodeValue.length < 9) return;

      this.$emit('search', {
        zipcode: this.zipcodeValue,
        number: this.numberValue,
        lat: this.lat,
        lng: this.lng,
      });
    },

    onClickSave() {
      this.$emit('save', {
        zipcode: this.zipcodeValue,
        number: this.numberValue,
        lat: this.lat,
        lng: this.lng,
      });
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

  .fieldTitle {
    color: #646363;
    font-size: 15px;
    line-height: 17px;
    margin-bottom: 10px;
    margin-top: 30px;
  }

  .fieldGroup {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0 auto;
  }

  .fieldAddress {
    color: #595959;
    display: block;
    font-size: 12px;
    font-style: italic;
    font-weight: normal;
    margin-top: 6px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .fieldError {
    color: #c33;
    display: block;
    font-size: 14px;
    margin-top: 6px;
  }

  .submitBlock {
    flex: 0.5;
  }

  .inputBlockZipcode {
    flex: 3;
  }

  .inputBlockNumber {
    flex: 2;
  }

  .icon {
    color: var(--link-color);
    cursor: pointer;
  }

  .inputBlock input,
  .inputBlock input:focus {
    border: 1px solid #dadada;
    border-radius: 4px;
  }

  .inputBlockGroup {
    display: flex;
    flex-direction: row;
  }

  .inputBlockGroup div,
  .inputZipcode {
    min-width: 100%;
    position: relative;
  }

  .inputBlock .inputError,
  .inputBlock .inputError:focus {
    border: 1px solid #c33;
  }

  .iconError {
    color: #c33;
    font-size: 18px;
  }

  .inputGroup {
    align-items: center;
    border-radius: 3px;
    display: flex;
    position: relative;
  }

  .baseCheckbox {
    flex-shrink: 0;
    margin-right: 10px;
    position: absolute;
    right: 0;
  }

  .baseCheckbox label {
    align-items: center;
    margin: 0;
  }

  .fieldNumberDisabled {
    background-color: #f9f9f9;
    border-color: #dadada;
  }

  .buttonFindLocation,
  .buttonClearZipcode {
    align-items: center;
    background: none;
    border: 0;
    display: flex;
    justify-content: center;
    left: -41px;
    position: relative;
  }

  .submitBlock > button {
    background-color: transparent;
    border: 1px solid #259591;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    color: #259591;
    display: flex;
    font-size: 16px;
    font-weight: bold;
    justify-content: center;
    padding-bottom: 10px;
    padding-top: 10px;
  }

  .footerInfo {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  .footerInfoTitle {
    color: #646363;
    font-size: 15px;
    margin: 0;
    padding: 0;
  }

  .findZipcodeButton span {
    color: #259591;
    font-size: 15px;
    font-weight: 700;
  }

  .findZipcodeButton,
  .findZipcodeButton:focus,
  .findZipcodeButton:hover {
    padding: 0;
    text-align: left;
  }

  .buttonsAction {
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: flex-end;
    margin-top: 30px;
  }

  .buttonCancel,
  .buttonCancel:hover,
  .buttonCancel:focus,
  .buttonCancel:active {
    background-color: transparent;
    border: 1px solid #259591;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    color: #259591;
    font-size: 18px;
    font-weight: bold;
    padding: 13px 40px;
  }

  .buttonSave,
  .buttonSave:hover,
  .buttonSave:focus,
  .buttonSave:active {
    background: #259591;
    border-radius: 4px;
    box-shadow: none;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    padding: 13px 40px;
  }

  @media media-md {
    .wrapper {
      padding: 0 20px 30px;
    }

    .fieldGroup {
      flex-direction: row;
    }

    .buttonsAction {
      flex-direction: row;
      gap: 5px;
    }
  }
</style>
