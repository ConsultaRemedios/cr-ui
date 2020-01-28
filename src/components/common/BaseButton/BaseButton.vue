<template>
  <component :is="element"
    :type="buttonType"
    :disabled="disabled || isLoading"
    :class="[
      $style.button,
      $style[size],
      $style[type],
      {
        [$style.inverted]: inverted,
        [$style.disabled]: disabled,
        [$style.fill]: fill,
        [$style.buttonLoading]: isLoading,
        [$style.buttonShadow]: type !== 'naked' && type !== 'naked-red',
      }
    ]"
    :target="target"
    @click="onClick"
    :href="path"
    v-bind="$attrs"
  >
    <BaseIcon
      v-if="isLoading"
      :id="loaderIcon.id"
      :class="$style.loaderIcon"
    />
    <BaseIcon
      v-if="icon"
      :id="icon.id"
      :class="$style.iconButton"
    />
    <span :class="[{[$style.textLoading]: isLoading}]">
      <slot></slot>
    </span>
  </component>
</template>

<script>
  import BaseIcon from '../BaseIcon';
  import loaderIcon from '../../../icons/loader.icon.svg';

  export default {
    inheritAttrs: false,
    name: 'BaseButton',
    props: {
      buttonType: {
        type: String,
        validator(value) {
          return ['button', 'submit'].includes(value);
        },
      },

      size: {
        type: String,
        default: 'medium',
        validator(value) {
          return ['small', 'medium', 'large'].includes(value);
        },
      },

      type: {
        type: String,
        default: 'success',
        validator(value) {
          return ['success', 'info', 'warning', 'danger', 'neutral', 'naked', 'naked-red'].includes(value);
        },
      },

      disabled: {
        type: Boolean,
        default: false,
      },

      fill: {
        type: Boolean,
        default: false,
      },

      path: {
        type: String,
      },

      openNewTab: {
        type: Boolean,
        default: false,
      },

      inverted: {
        type: Boolean,
        default: false,
      },

      isLoading: {
        type: Boolean,
        default: false,
      },
      icon: {
        type: Object,
      },
    },

    computed: {
      element() {
        return this.path ? 'a' : 'button';
      },

      target() {
        return this.openNewTab ? '_blank' : null;
      },

      loaderIcon() {
        return loaderIcon;
      },
    },

    methods: {
      onClick() {
        this.$emit('click');
      },
    },

    components: {
      BaseIcon,
    },
  };
</script>

<style module>
  @value media-md from './../../../styles/variables.css';

  .button > span {
    display: inline-block;
    line-height: 24px;
  }

  .button {
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    transition: background-color 0.25s ease-out,
                border-color 0.25s ease-out,
                color 0.25s ease-out;
  }

  .buttonShadow {
    box-shadow: 0 1px 6px 0 rgba(0,0,0,0.15);
  }

  .button:hover {
    text-decoration: none;
  }

  .button:focus {
    outline: none;
  }

  /* Sizes */
  .small {
    font-size: 14px;
    font-weight: 600;
    padding: 1px 8px;
  }

  .medium {
    padding: 7px 18px;
    font-size: 14px;
    font-weight: 600;
  }

  .large {
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
  }

  /* Fill */
  .fill {
    width: 100%;
  }

  /* Types */
  .success {
    background-color: #1BB738;
    border: 1px solid #1BB738;
    color: #FFF;
  }

  .success:focus,
  .success:hover {
    background-color: #16942D;
    border-color: #16942D;
    color: #FFF;
  }

  .info {
    background-color: #3DC2C2;
    border-color: #3DC2C2;
    border-style: solid;
    color: #FFF;
  }

  .info:focus,
  .info:hover {
    background-color: #169998;
    border-color: #169998;
    color: #FFF;
  }

  .warning {
    background-color: #F9AD3D;
    border-color: #F9AD3D;
    border-style: solid;
    color: #FFF;
  }

  .warning:focus,
  .warning:hover {
    background-color: #CA8C31;
    border-color: #CA8C31;
    color: #FFF;
  }

  .neutral {
    background-color: #FFF;
    border: 1px solid #D9D9D9;
    color: #333333;
  }

  .neutral:focus,
  .neutral:hover {
    background-color: #F8F8F8;
    border-color: #D9D9D9;
    color: #333333;
  }

  .danger {
    background-color: #D30B3F;
    border-color: #D30B3F;
    border-style: solid;
    color: #FFF;
  }

  .danger:focus,
  .danger:hover {
    background-color: #AB0933;
    border-color: #AB0933;
    color: #FFF;
  }

  .naked {
    border: 0;
    background: transparent;
    color: #00AAE5;
  }

  .naked:focus,
  .naked:hover {
    color: #007CA7;
  }

  .naked-red {
    composes: naked;
    color: #D30B3F;
  }

  .naked-red:hover {
    color: #AB0933;
  }

  /* States */
  .disabled,
  .disabled:hover,
  .disabled:focus {
    cursor: default;
    background-color: #EEE;
    border-color: #EEE;
    color: #CCC;
  }

  .inverted.success {
    border: 1px solid #1BB738;
    color: #1BB738;
  }

  .inverted.info {
    border: 1px solid #3DC2C2;
    color: #3DC2C2;
  }

  .inverted.warning {
    border: 1px solid #F9AD3D;
    color: #F9AD3D;
  }

  .inverted.neutral {
    background-color: #D9D9D9;
    border: 1px solid #D9D9D9;
  }

  .inverted.neutral:hover {
    background-color: #333;
    border-color: #333;
  }

  .inverted.danger {
    border: 1px solid #D30B3F;
    color: #D30B3F;
  }

  .inverted {
    background-color: #FFF;
  }

  .inverted:hover {
    color: #FFF;
  }

  /* Combined type and size */
  .naked.medium,
  .naked-red.medium {
    font-size: 14px;
    font-weight: 800;
  }

  .naked.disabled,
  .naked.disabled:hover {
    background-color: transparent;
  }

  .loaderIcon {
    animation: rotate-loader 1.5s infinite;

    position:absolute;
    top: 50%;
    left:0;
    right:0;
    margin-left:auto;
    margin-right:auto;
    transform: translateY(-50%);
  }

  .iconButton {
    margin-right: 4px;
  }

  .buttonLoading {
    position: relative;
  }

  .textLoading {
    opacity: 0;
  }

  @media media-md {
    .large {
      padding-left: 25px;
      padding-right: 25px;
    }
  }

  @keyframes rotate-loader {
    0% {
      transform: translateY(-50%) rotate(0deg);
    }

    100% {
      transform: translateY(-50%) rotate(360deg);
    }
  }
</style>
