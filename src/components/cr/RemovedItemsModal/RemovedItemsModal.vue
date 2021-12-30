<template>
  <div
    v-if="show"
    :class="$style.zIndex"
  >
    <BaseModal
      :dismissible="false"
    >
      <div :class="$style.wrapper">
        <h1 :class="$style.heading">
          <BaseIcon
            id="warning.icon"
            :class="$style.icon"
          />
          Atenção!
        </h1>

        <p :class="$style.description">
          Alguns produtos em seu carrinho sofreram alteração:
        </p>

        <ul :class="$style.storesList">
          <li
            v-for="store in stores"
            :key="store.id"
          >
            <div :class="$style.storeInfo">
              <img
                :src="store.logo"
                :class="$style.storeLogo"
              >
              <p>
                Vendido e entregue por <br>
                <strong>{{ store.name }}</strong>
              </p>
            </div>
            <ul :class="$style.productsList">
              <li
                v-for="item in store.items"
                :key="store.id + item.name"
                :class="$style.productItem"
              >
                <img
                  :src="item.image"
                  :class="$style.productItem__image"
                >
                <div :class="$style.productItem__description">
                  <p>
                    <strong>{{ item.name }}</strong> {{ item.variation }}
                  </p>
                  <div
                    v-if="item.remainingQuantity !== 0"
                    :class="$style.productItem__tooltipWrapper"
                  >
                    <div :class="$style.productItem__tooltip">
                      {{
                        pluralize(
                          item.removedQuantity,
                          'unidade foi removida',
                          'unidades foram removidas'
                        )
                      }}
                    </div>
                    <div :class="$style.productItem__remaining">
                      <BaseIcon
                        id="cart.icon"
                        :class="$style.productItem__remainingIcon"
                      />
                      Sobraram {{ item.remainingQuantity }} un. no carrinho
                    </div>
                  </div>
                  <div
                    v-else
                    :class="$style.productItem__tooltipWrapper"
                  >
                    <div
                      :class="[
                        $style.productItem__tooltip,
                        $style['productItem__tooltip--outofstock']
                      ]"
                    >
                      Ops, acabou o estoque
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <BaseButton
          :class="$style.button"
          @click="dismissModal"
        >
          {{ actionLabel }}
        </BaseButton>
      </div>
    </BaseModal>
  </div>
</template>

<script>
  import BaseModal from '../../common/BaseModal';
  import BaseButton from '../../common/BaseButton';
  import BaseIcon from '../../common/BaseIcon';
  import { pluralize } from '../../../filters';

  export default {
    name: 'RemovedItemsModal',
    components: {
      BaseButton,
      BaseIcon,
      BaseModal,
    },
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      stores: {
        type: Array,
        required: true,
      },
      actionLabel: {
        type: String,
        default: 'Continuar Comprando',
      }
    },
    methods: {
      dismissModal() {
        this.$emit('close');
      },

      pluralize,
    },
  };
</script>

<style module>
  .zIndex {
    position: fixed;
    z-index: 10000;
  }

  .wrapper {
    font-family: 'Helvetica';
    max-width: 450px;
    padding: 20px;
    text-align: center;
    width: 100%;
  }

  .heading {
    color: #000;
    font-size: 22px;
    font-weight: normal;
    margin-bottom: 20px;
    margin-top: 0;
  }

  .icon {
    color: #f9ad3d;
    font-size: 36px;
    margin-right: 5px;
    vertical-align: -8px;
  }

  .description {
    color: #333;
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 20px;
  }

  .storesList {
    border-bottom: 1px solid #999;
    margin: 0 -20px 20px;
    text-align: left;
  }

  .storeInfo {
    border-top: 1px solid #999;
    display: flex;
    padding: 20px;
  }

  .storeLogo {
    align-self: flex-start;
    margin-right: 10px;
    width: 95px;
  }

  .productsList {
    padding: 0 20px;
  }

  .productItem {
    border-top: 1px solid #dadada;
    display: flex;
    padding: 10px 0;
  }

  .productItem__image {
    align-self: flex-start;
    margin-right: 10px;
    width: 40px;
  }

  .productItem__description {
    flex: 1;
  }

  .productItem__remaining {
    color: #d30b3f;
    font-size: 13px;
    font-weight: 600;
    line-height: 21px;
    margin-top: 4px;
  }

  .productItem__remainingIcon {
    font-size: 18px;
  }

  .productItem__tooltipWrapper {
    text-align: center;
  }

  .productItem__tooltip {
    background-color: #f9ad3d;
    border-radius: 4px;
    color: #fff;
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    line-height: 21px;
    padding: 2px 25px;
    position: relative;
    text-align: center;
  }

  .productItem__tooltip::after {
    border: solid transparent;
    border-bottom-color: #f9ad3d;
    border-width: 5px;
    bottom: 100%;
    content: ' ';
    height: 0;
    left: 50%;
    margin-left: -5px;
    pointer-events: none;
    position: absolute;
    width: 0;
  }

  .productItem__tooltip--outofstock {
    background-color: #555;
  }

  .productItem__tooltip--outofstock::after {
    border-bottom-color: #555;
  }

  .button {
    text-transform: uppercase;
  }
</style>
