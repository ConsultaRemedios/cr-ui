<template>
  <BaseModal @close="$emit('close')" :class="$style.baseModal">
    <div :class="$style.header">
      <button
        :class="$style.arrowButton"
        @click="$emit('close')"
      >
        <BaseIcon :id="icons.arrowLeft.id"/>
      </button>
    </div>

    <div
      :class="[
        $style.wrapper,
        !isLoading && $style.loadingMaxHeight,
      ]"
      :style="{ maxHeight: `${ui.maxContentHeight}px` }"
    >
      <div :class="$style.logoWrapper">
        <img
          :class="$style.logo"
          :src="logoPath"
          :alt="name"
          @load="updateMaxContentHeight"
          @error="updateMaxContentHeight"
        >
      </div>

      <div
        :class="[$style.content, {
            [$style.showScroll]: isMobileBreakpoint,
            [$style.contentloader]: isLoading,
          }]"
      >
        <SimpleLoader
          v-if="isLoading"
        />

        <div v-else>
          <slot></slot>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script>
  import BaseModal from '../../common/BaseModal';
  import BaseIcon from '../../common/BaseIcon';
  import SimpleLoader from '../../common/SimpleLoader';
  import breakpointable from '../../../mixins/breakpointable';
  import arrowLeft from '../../../icons/arrow-left.icon.svg';

  const modalExternalPadding = 40;

  export default {
    name: 'StoreBaseModal',

    components: {
      BaseModal,
      SimpleLoader,
      BaseIcon,
    },

    mixins: [breakpointable],

    props: {
      name: {
        type: String,
        default: '',
      },

      logoPath: {
        type: String,
        default: '',
      },

      isLoading: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        ui: {
          maxContentHeight: 0,
        },
      };
    },

    methods: {
      updateMaxContentHeight() {
        this.ui.maxContentHeight = window.innerHeight - (modalExternalPadding * 2);
      },
    },

    computed: {
      icons() {
        return {
          arrowLeft,
        };
      },
    },

    mounted() {
      this.updateMaxContentHeight();

      window.addEventListener('resize', this.updateMaxContentHeight);
    },

    destroyed() {
      window.removeEventListener('resize', this.updateMaxContentHeight);
    },
  };
</script>

<style module>
  @value screen-sm-min, screen-xs-max, screen-sm-max from './../../../styles/variables.css';

  .logoWrapper {
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 120px;
    height: 84px;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    margin-right: 16px;
    margin-top: -25px;
  }

  .header {
    background: url('./../../../assets/header.svg') no-repeat;
    background-size: cover;
    width: 100%;
    height: 80px;
  }

  .arrowButton {
    border: none;
    background: transparent;
    margin-top: 10px;
    color: var(--link-color);
  }

  .loadingMaxHeight {
    max-height: 116px;
  }

  .wrapper {
    display: flex;
    max-height: 2000px;
    transition: max-height 0.15s ease-out;
    padding: 0 16px 16px;
  }

  .logo {
    margin: 0;
    width: 99px;
    height: 57px;
    vertical-align: middle;
  }

  .contentloader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 260px;
    min-height: 260px;
  }

  .content {
    overflow: auto;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }

  .showScroll {
    overflow: scroll;
  }

  .showScroll::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  .showScroll::-webkit-scrollbar:vertical {
    width: 5px;
  }

  .showScroll::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .5);
    border-radius: 10px;
    border: 2px solid transparent;
  }

  .showScroll::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }

  @media (min-width: screen-sm-min) {
    .wrapper {
      width: 615px;
    }
  }

  @media (min-width: screen-sm-max) {
    .header {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    .arrowButton {
      display: none;
    }
  }

  @media (max-width: screen-xs-max) {
    .content {
      width: 100%;
    }

    .wrapper {
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
      padding: 0 10px 10px;
    }

    .logoWrapper {
      margin-right: 0;
      margin-bottom: 24px;
    }

  }

  @media (min-width: screen-xs-max) and (max-width: screen-sm-max) {
    .content {
      width: 100%;
    }

    .wrapper {
      width: 100%;
      height: 100%;
      padding: 0 10px 10px;
    }
  }

  @media (max-width: screen-sm-max) {
    .baseModal :global(.cr-base-modal__close) {
      display: none;
    }

    .baseModal :global(.cr-base-modal__content) {
      border-radius: 0;
      min-height: 100vh;
      width: 100%;
    }

    .baseModal :global(.cr-base-modal__container) {
      padding: 0;
    }
  }
</style>
