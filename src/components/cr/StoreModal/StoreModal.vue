<template>
  <StoreBaseModal
    :name="name"
    :logo-path="logoPath"
    :is-loading="isLoading"
    @close="$emit('close')"
  >
    <div :class="$style.content">
      <span :class="$style.title">{{ name }} é uma loja confiável!</span>
      <span :class="$style.subTitle">
        O CR faz uma análise rigorosa para exibir somente lojas confiáveis.
      </span>
      <div :class="$style.wrapperTitleCta">
        <BaseIcon
          :id="icons.truckIcon.id"
          :class="$style.truckIcon"
        />
        <span :class="$style.info">
          <strong>Economize no frete</strong> adicionando produtos da mesma loja
        </span>
      </div>
      <BaseButton
        @click="onClick"
        :path="storePath"
        :class="$style.baseButton"
        type="naked"
      >
        Ver mais produtos da loja
      </BaseButton>

      <div :class="$style.fields">
        <div
          v-for="(field, i) in informations"
          :key="i"
          :class="$style.field"
        >
          <div>
            <span :class="$style.fieldTitle">{{ field.title }}</span>
            <div
              :class="$style.fieldContent"
              v-html="field.content"
            />
          </div>
        </div>
      </div>
    </div>
    <slot />
  </StoreBaseModal>
</template>

<script>
import StoreBaseModal from '../StoreBaseModal';
import BaseButton from '../../common/BaseButton';
import BaseIcon from '../../common/BaseIcon';
import truckIcon from '../../../icons/truck.icon.svg';

export default {
  name: 'StoreModal',
  components: { StoreBaseModal, BaseButton, BaseIcon },
  props: {
    name: {
      type: String,
      default: '',
    },

    logoPath: {
      type: String,
      default: '',
    },

    informations: {
      type: Array,
      default: () => [],
    },

    isLoading: {
      type: Boolean,
      default: false,
    },

    storePath: {
      type: String,
      default: '',
    },
  },

  computed: {
    icons() {
      return {
        truckIcon,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit('clickShowMoreProducts');
    },
  },
};
</script>

<style module>
  @value screen-sm-min from './../../../styles/variables.css';

  .infoData > p {
    font-size: 14px;
    color: var(--text-secondary);
  }

  .subTitle {
    display: block;
    font-size: 14px;
    color : var(--text-default);
    margin-bottom: 34px;
  }

  .title {
    display: block;
    font-size: 20px;
    color: var(--text-default);
    margin-top: 10px;
    margin-bottom: 3px;
    line-height: 20px;
  }

  .baseButton {
    width: 100%;
    height: 44px;
    margin-top: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--background-color-primary);
    border-color: var(--border-color-primary);
  }

  .baseButton:focus {
    background: var(--background-color-primary-hover);
    border-color: var(--border-color-primary-hover);
  }

  .baseButton span {
    color: white;
    font-size: 16px;
    font-weight: normal;
  }

  .baseButton:hover {
    background: var(--background-color-primary-hover);
    border-color: var(--border-color-primary-hover);
  }

  .addressTitle {
    display: block;
    font-size: 14px;
    color: var(--text-secondary);
  }

  .titleInfos {
    display: block;
    font-size: 14px;
    font-weight: normal;
  }

  .info {
    font-size: 14px;
    color: var(--text-success);
  }

  .field {
    margin-bottom: 32px;
  }

  .field:last-child {
    margin-bottom: 0;
  }

  .fieldTitle {
    font-weight: bold;
    color: var(--text-default);
    display: block;
    margin-bottom: 2px;
    font-size: 14px;
  }

  .fieldContent, .fieldContent > p {
    color: var(--text-default);
    font-weight: normal;
    margin: 0;
    font-size: 14px;
  }

  .fieldContent a {
    color: var(--link-color);
  }

  .fieldContent p:last-child {
    margin-bottom: 0;
  }

  .wrapperTitleCta {
    display: flex;
    align-items: center;
  }

  .truckIcon {
    width: 20px;
    height: 20px;
    color: var(--text-success);
    margin-right: 8px;
  }

  @media (min-width: screen-sm-min) {
    .field {
      display: inline-block;
      width: 100%;
    }
  }
</style>
