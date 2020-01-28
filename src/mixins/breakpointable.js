import verge from 'verge';
import { breakpointByWidth } from './../helpers/breakpoints/utils';

export default {
  data: () => ({
    viewportWidth: verge.viewportW(),
  }),

  mounted() {
    window.addEventListener('resize', this.setWidth);
  },

  destroyed() {
    window.removeEventListener('resize', this.setWidth);
  },

  computed: {
    breakpoint() {
      return breakpointByWidth(this.viewportWidth);
    },

    isMobileBreakpoint() {
      return ['xs', 'sm', 'md'].includes(this.breakpoint);
    },

    isTabletBreakpoint() {
      return this.breakpoint === 'md';
    },

    isDesktopBreakpoint() {
      return !this.isMobileBreakpoint;
    },
  },

  methods: {
    setWidth() {
      this.viewportWidth = verge.viewportW();
    },
  },
};
