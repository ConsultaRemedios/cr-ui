<script>
export default {
  name: 'InputGroup',
  render(createElement) {
    this.$slots.default.forEach((item) => {
      const vnode = item;

      if (/BaseInput/.test(vnode.tag)) {
        vnode.data.class = this.$style.customInput;
      }
      if (/BaseButton/.test(vnode.tag)) {
        vnode.data.class = this.$style.customButton;
      }
    });

    return createElement(
      'div',
      {
        attrs: {
          class: this.$style.wrapper,
        },
      },
      this.$slots.default,
    );
  },
};
</script>

<style module>
  .wrapper {
    display: flex;
  }

  .customInput {
    width: 100%;
  }

  .customInput input {
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
  }

  .customInput input:focus {
    border: 1px solid #DADADA;
  }

  .customButton {
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
  }
</style>
