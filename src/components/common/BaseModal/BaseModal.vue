<template>
  <transition
    :enter-class="enterTransitionClass"
    :leave-to-class="leaveTransitionClass"
    :leave-class="leaveTransitionClass"
    :leave-active-class="leaveTransitionClass"
  >
    <div
      v-if="showModal"
      :class="[$style.overlay, 'cr-base-modal__overlay', customCssClass]"
      data-modal-overlay
      @click="onClickOverlay"
    >
      <div
        :class="containerClass"
        data-modal-container
      >
        <div
          :class="[$style.content, 'cr-base-modal__content', { [$style.contentFooter]: isFooter }]"
          data-modal-content
        >
          <button
            v-if="dismissible"
            data-modal-close
            :class="[$style.closeButton, 'cr-base-modal__close']"
            @click="close()"
          >
            <span :class="$style.closeButtonLabel">Fechar</span>
          </button>

          <slot />
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
    type: {
      type: String,
      validator: (value) => ['normal', 'footer'].includes(value),
      default: 'normal',
    },
    customCssClass: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    showModal: false,
  }),

  async mounted() {
    this.showModal = true;
    await this.$nextTick();
    disableBodyScroll(this.$el);
  },

  destroyed() {
    enableBodyScroll(this.$el);
  },

  computed: {
    containerClass() {
      return [
        this.$style.container,
        { [this.$style.containerFooter]: this.isFooter },
        'cr-base-modal__container',
        this.type,
      ];
    },
    enterTransitionClass() {
      return this.isFooter ? this.$style.enterToTransitionFooter : this.$style.enterToTransition;
    },
    leaveTransitionClass() {
      return this.isFooter ? this.$style.leaveToTransitionFooter : this.$style.leaveToTransition;
    },
    isFooter() {
      return this.type === 'footer';
    },
  },

  methods: {
    onClickOverlay(e) {
      const isOverlayTheTarget = e.target.querySelector('[data-modal-content]');

      if (isOverlayTheTarget && this.dismissible) {
        this.$emit('close');
      }
    },
    close() {
      this.showModal = false;
      this.$emit('close');
    },
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
    overflow: hidden;
  }

  .containerFooter {
    padding: 0px;
    flex-direction: row-reverse;
    align-items: flex-end;
  }

  .content {
    background: #FFF;
    position: relative;
    border-radius: 4px;
    transition: transform 0.2s ease-out;
    transform: scale(1);
    opacity: 1;
    will-change: transform;
  }

  .contentFooter {
    position: inherit;
    display: flex;
    width: 100%;
    border-radius: 10px 10px 0 0;
    transform: translateY(0px);
    transition: transform .3s ease-out;
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

  .enterToTransitionFooter .content,
  .leaveToTransitionFooter .content {
    transform: translateY(100%);
  }

  .enterToTransition .content,
  .leaveToTransition .content {
    transform: scale(1.05);
    opacity: 0;
  }

  @media (min-width: 768px) {
    .closeButton {
      top: 20px;
      right: 20px;
    }
  }
</style>
