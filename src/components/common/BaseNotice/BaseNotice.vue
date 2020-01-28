<template>
<transition
  :enter-class="$style.enter"
  :enter-active-class="$style.enterActive"
  :enter-to-class="$style.enterTo"
  :leave-class="$style.leave"
  :leave-active-class="$style.leaveActive"
  :leave-to-class="$style.leaveTo"
  @after-leave="$emit('hide')"
>
  <div
    v-show="show"
    :class="[{[$style.snackbar]: this.snackbar} , $style.notice, $style[type]]"
  >
    <ContainerBlock>
      <div :class="$style.content">
        <div :class="$style.iconBlock">
          <BaseIcon :id="icon.id" />
        </div>

       <div :class="$style.textBlock">
         <span :class="$style.title">
          {{title}}
          </span>

          <p v-if="message" :class="$style.message">
            {{message}}
          </p>
       </div>
      </div>
    </ContainerBlock>
  </div>
</transition>
</template>

<script>
  import ContainerBlock from './../ContainerBlock';
  import infoIcon from './../../../icons/info.icon.svg';
  import BaseIcon from '../BaseIcon';

  export default {
    name: 'BaseNotice',
    components: {
      ContainerBlock,
      BaseIcon,
    },

    data() {
      return {
        show: false,
      };
    },

    props: {
      type: {
        type: String,
        default: 'info',
        validator(value) {
          return ['info', 'warning', 'success', 'danger'].includes(value);
        },
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
      },

      scrollToSelf: {
        type: Boolean,
        default: true,
      },

      icon: {
        type: Object,
        default() { return infoIcon; },
      },

      timeout: {
        type: Number,
        default: 5000,
      },

      snackbar: {
        type: Boolean,
        default: false,
      },

      autoClose: {
        type: Boolean,
        default: false,
      },
    },

    mounted() {
      if (this.scrollToSelf && !this.snackbar) {
        window.scrollTo(0, this.$el.offsetTop);
      }

      this.show = true;

      if (this.autoClose) {
        setTimeout(() => {
          this.show = false;
        }, this.timeout);
      }
    },
  };
</script>

<style module>
  @value media-md, media-lg from './../../../styles/variables.css';

  .content {
    display: inline-flex;
    align-items: center;
  }

  .iconBlock {
      padding-right: 10px;
    }

  .notice {
    color: #fff;
    padding: 15px 0;
  }

  .icon {
    display: none;
  }

  .title {
    font-weight: 800;
  }

  .message {
    margin: 0;
  }

  .info {
    background: #aaaaaa;
  }

  .warning {
    background: #fb9c12;
  }

  .success {
    background: #1BB738
  }

  .danger {
    background: #D30B3F;
  }

  .snackbar {
    min-width: 300px;
    border-radius: 5px;
    z-index: 99999;
    position: fixed;
    top: 10px;
    left: 10px;
    right: 10px;
    box-shadow: 0 3px 4px 0 rgba(0,0,0,0.34);
  }

  .snackbar.info {
    background: rgb(170, 170, 170, 0.94);
  }

  .snackbar.warning {
    background: rgb(251, 156, 18, 0.94);
  }

  .snackbar.success {
    background: rgb(27, 183, 56, 0.94);
  }

  .snackbar.danger {
    background: rgba(211, 11, 63, 0.94);
  }

  .snackbar.enterActive,
  .snackbar.leaveActive {
    transition: opacity 0.2s ease-out,
                transform 0.2s ease-out;
  }

  .snackbar.enter,
  .snackbar.leaveTo {
    opacity: 0;
    transform: translateY(-100%);
  }

  .snackbar.enterTo,
  .snackbar.leave {
    opacity: 1;
    transform: translateY(0);
  }

  @media media-md {
    .snackbar {
      top: 20px;
      left: 50%;
      right: auto;
      transform: translateX(-50%);
      min-width: 680px;
    }

    .snackbar.enter,
    .snackbar.leaveTo {
      transform: translateX(-50%) translateY(-100%);
    }

    .snackbar.enterTo,
    .snackbar.leave {
      transform: translateX(-50%) translateY(0);
    }
  }

  @media media-lg {
    .snackbar {
      top: 95px;
      padding: 15px 10px;
    }

    .content {
      position: relative;
      align-items: center;
    }

    .iconBlock {
      padding-right: 17px;
    }

    .icon {
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }

</style>
