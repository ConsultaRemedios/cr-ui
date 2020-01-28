<template>
  <BaseModal @close="$emit('close')">
    <div
      :class="[
        $style.wrapper,
        !isLoading && $style.loadingMaxHeight,
      ]"
      :style="{ maxHeight: `${ui.maxContentHeight}px` }"
    >
      <div>
        <span :class="$style.title">
          {{ title }}
        </span>
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
  import SimpleLoader from '../../common/SimpleLoader';
  import breakpointable from '../../../mixins/breakpointable';

  const modalExternalPadding = 40;

  export default {
    name: 'StoreBaseModal',

    components: {
      BaseModal,
      SimpleLoader,
    },

    mixins: [breakpointable],

    props: {
      title: {
        type: String,
        default: '',
      },

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
  .loadingMaxHeight {
    max-height: 116px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    max-height: 2000px;
    transition: max-height 0.15s ease-out;
    padding: 20px;
  }

  .title {
    display: block;
    min-width: 200px;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333333;
  }

  .logo {
    margin-bottom: 15px;
    max-width: 130px;
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

  @media (min-width: 768px) {
    .wrapper {
      width: 585px;
      padding: 40px;
    }
  }
</style>
