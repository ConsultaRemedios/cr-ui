<template>
  <transition
    :enter-class="$style.enter"
    :enter-active-class="$style.enterActive"
    :enter-to-class="$style.enterTo"
    :leave-class="$style.leave"
    :leave-active-class="$style.leaveActive"
    :leave-to-class="$style.leaveTo"
  >
    <div
      v-show="show"
      :class="[$style.wrapper, themeClass]"
      :style="style"
    >
      <slot></slot>

      <div :class="$style.arrow" data-popper-arrow></div>
    </div>
  </transition>
</template>

<script>
  import { createPopper } from '@popperjs/core';

  export default {
    name: 'BaseTooltip',
    props: {
      show: {
        type: Boolean,
        required: true,
      },

      position: {
        type: String,
        default: 'top',
      },

      fixed: {
        type: Boolean,
        default: false,
      },

      width: {
        type: String,
        default: 'auto',
      },

      height: {
        type: String,
        default: 'auto',
      },

      theme: {
        type: String,
        default: 'light',
      },
    },

    data() {
      return {
        positionFitted: this.position,
        style: {
          width: this.width,
          height: this.height,
        },
        reference: null,
        content: null,
      };
    },

    mounted() {
      this.reference = this.$el.parentNode || document.body;
      this.content = this.$el;

      document.body.appendChild(this.content);

      this.initPopper();
    },

    destroyed() {
      this.destroyPopper();

      this.reference.appendChild(this.content);
    },

    methods: {
      initPopper() {
        this.popper = createPopper(this.reference, this.content, {
          placement: this.position,
          removeOnDestroy: true,
          strategy: this.fixed ? 'fixed' : 'absolute',
          modifiers: [
            {
              name: 'arrow',
              options: {
                padding: 5,
              },
            },
            {
              name: 'offset',
              options: {
                offset: [0, 9],
              },
            },
          ],
        });
      },

      updatePopper() {
        if (this.popper) {
          this.popper.forceUpdate();
        }
      },

      destroyPopper() {
        if (this.popper) {
          this.popper.destroy();
          this.popper = null;
        }
      },
    },

    computed: {
      themeClass() {
        if (this.theme === 'dark') return this.$style.dark;
        return this.$style.light;
      },
    },

    watch: {
      show() {
        if (!this.show) return;

        this.$nextTick(() => {
          this.updatePopper();
        });
      },
    },
  };
</script>

<style module>
  .light {
    border: 1px solid #DADADA;
    color: #333333;
    background-color: #FFFFFF;
  }

  .dark {
    color: #FFFFFF;
    background-color: #333333;
    border-radius: 2px;
  }

  .wrapper {
    position: absolute;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.31);
    z-index: 9999;
    padding: 15px;
    opacity: 1;
  }

  .arrow {
    position: absolute;
    overflow: hidden;
  }

  .light .arrow::after {
    background: #FFF;
  }

  .dark .arrow::after {
    background: #333333;
  }

  .arrow::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.31);
  }

  .wrapper[data-popper-placement^="top"] .arrow {
    width: 30px;
    height: 15px;
    top: 100%;
    transform: translateX(-50%);
  }

  .wrapper[data-popper-placement^="top"] .arrow::after {
    bottom: 8px;
    left: 8px;
  }

  .wrapper[data-popper-placement^="left"] .arrow {
    width: 15px;
    height: 30px;
    left: 100%;
    transform: translateY(-50%);
  }

  .wrapper[data-popper-placement^="left"] .arrow::after {
    top: 8px;
    right: 8px;
  }

  .wrapper[data-popper-placement^="right"] .arrow {
    width: 15px;
    height: 30px;
    right: 100%;
    transform: translateY(-50%);
  }

  .wrapper[data-popper-placement^="right"] .arrow::after {
    top: 8px;
    left: 8px;
  }

  .wrapper[data-popper-placement^="bottom"] .arrow {
    width: 30px;
    height: 15px;
    bottom: 100%;
    transform: translateX(-50%);
  }

  .wrapper[data-popper-placement^="bottom"] .arrow::after {
    top: 8px;
    left: 8px;
  }

  .enterActive,
  .leaveActive {
    transition: opacity 0.2s ease-out;
  }

  .enter,
  .leaveTo {
    opacity: 0;
  }

  .enterTo,
  .leave {
    opacity: 1;
  }
</style>
