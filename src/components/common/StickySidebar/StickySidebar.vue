<template>
  <div ref="wrapper" :style="wrapperStyle">
    <div ref="block" :style="blockStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { debounce } from './../../../helpers';

  export default {
    name: 'StickySidebar',

    props: {
      offset: {
        type: Number,
        default: 0,
      },
    },

    data() {
      return {
        slotHeight: 0,
        slotWidth: 0,
        status: 'static',
      };
    },

    computed: {
      wrapperStyle() {
        return { height: this.status === 'static' ? 'auto' : `${this.slotHeight}px` };
      },

      blockStyle() {
        if (this.status === 'static') {
          return { position: 'static' };
        }

        if (this.status === 'sticky-ready') {
          return { width: `${this.slotWidth}px`, position: 'fixed', top: `${this.offset}px` };
        }

        return { transform: `translateY(${this.$el.parentNode.offsetHeight - this.slotHeight}px)` };
      },
    },

    methods: {
      setSize() {
        const $el = this.$slots.default[0].elm;
        this.slotHeight = $el.offsetHeight;
        this.slotWidth = $el.offsetWidth;
      },

      handlePosition() {
        const { scrollTop } = document.querySelector('html');
        const elOffsetTop = (scrollTop + this.$el.getBoundingClientRect().top) - this.offset;

        if (window.innerWidth >= 768 && scrollTop >= elOffsetTop) {
          const $parentBottomPosition = this.$el.parentNode.getBoundingClientRect().bottom;
          const hasLimitReached = $parentBottomPosition <= (this.slotHeight + this.offset);

          this.status = hasLimitReached ? 'limit-reached' : 'sticky-ready';
        } else {
          this.status = 'static';
        }
      },

      handleResize() {
        debounce(200, () => {
          this.status = 'static';

          this.$nextTick(() => {
            this.setSize();
            this.handlePosition();
          });
        });
      },
    },

    mounted() {
      this.setSize();

      window.addEventListener('scroll', this.handlePosition);
      window.addEventListener('resize', this.handleResize);
    },

    beforeDestroy() {
      window.removeEventListener('scroll', this.handlePosition);
      window.addEventListener('resize', this.handleResize);
    },
  };
</script>
