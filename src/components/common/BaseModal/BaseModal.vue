<template>
  <transition
    :enter-class="$style.enterTransition"
    :leave-active-class="$style.leaveActiveTransition"
  >
    <div :class="[$style.overlay, 'cr-base-modal__overlay', customCssClass]" @click="onClickOverlay" data-modal-overlay>
      <div :class="[$style.container, 'cr-base-modal__container']" data-modal-container>
        <div :class="[$style.content, 'cr-base-modal__content']" data-modal-content>
          <button v-if="dismissible" data-modal-close
            :class="[$style.closeButton, 'cr-base-modall__close']"
            @click="$emit('close')"
          >
            <span :class="$style.closeButtonLabel">Fechar</span>
          </button>

          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

  export default {
    name: 'BaseModal',
    props: {
      dismissible: {
        type: Boolean,
        default: true,
      },

      customCssClass: {
        type: Array,
        default: () => [],
      },
    },

    methods: {
      onClickOverlay(e) {
        const isOverlayTheTarget = e.target.querySelector('[data-modal-content]');

        if (isOverlayTheTarget && this.dismissible) {
          this.$emit('close');
        }
      },
    },

    mounted() {
      disableBodyScroll(this.$el);
    },

    destroyed() {
      enableBodyScroll(this.$el);
    },
  };
</script>

<style module>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    overflow: auto;

    transition: opacity 0.2s ease-out;
    opacity: 1;
  }

  .container {
    min-width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .content {
    background: #FFF;
    position: relative;
    border-radius: 4px;
    transition: transform 0.2s ease-out;
    transform: scale(1);
  }

  .closeButton {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    padding: 5px;
    background: none;
    border: 0;
  }

  .closeButton::after {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    background: url('./../../../assets/close-icon.svg');
  }

  .closeButtonLabel {
    display: block;
    font-size: 0;
    height: 1px;
    overflow: hidden;
  }

  .enterTransition,
  .leaveActiveTransition {
    opacity: 0;
  }

  .enterTransition .content,
  .leaveActiveTransition .content {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    .closeButton {
      top: 20px;
      right: 20px;
    }
  }
</style>
