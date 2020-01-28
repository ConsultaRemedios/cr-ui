<template>
  <div :class="rowClasses" :style="{margin: margin}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GridRow',
    props: {
      justify: {
        type: [String, Object],
      },
      align: {
        type: [String, Object],
      },
      gutter: {
        type: Number,
        default: 30,
      },
    },
    computed: {
      rowClasses() {
        const classes = [this.$style.row];

        if (typeof this.align === 'string') {
          classes.push(this.$style[this.align]);
        } else if (typeof this.align === 'object') {
          Object.keys(this.align).forEach((breakpointName) => {
            const breakpointValue = this.align[breakpointName];
            classes.push(this.$style[`${breakpointName}-${breakpointValue}`]);
          });
        }

        if (typeof this.justify === 'string') {
          classes.push(this.$style[this.justify]);
        } else if (typeof this.justify === 'object') {
          Object.keys(this.justify).forEach((breakpointName) => {
            const breakpointValue = this.justify[breakpointName];
            classes.push(this.$style[`${breakpointName}-${breakpointValue}`]);
          });
        }

        return classes;
      },
      margin() {
        return `${0} -${this.gutter / 2}px`;
      },
    },
  };
</script>

<style module>
  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .left {
    justify-content: flex-start;
  }

  .center {
    justify-content: center;
  }

  .right {
    justify-content: flex-end;
  }

  .justified {
    justify-content: space-between;
  }

  .top {
    align-items: flex-start;
  }

  .middle {
    align-items: center;
  }

  .bottom {
    align-items: flex-end;
  }

  @media (min-width: 0) {
    .xs-left {
      justify-content: flex-start;
    }

    .xs-center {
      justify-content: center;
    }

    .xs-right {
      justify-content: flex-end;
    }

    .xs-justified {
      justify-content: space-between;
    }

    .xs-top {
      align-items: flex-start;
    }

    .xs-middle {
      align-items: center;
    }

    .xs-bottom {
      align-items: flex-end;
    }
  }

  @media (min-width: 576px) {
    .sm-left {
      justify-content: flex-start;
    }

    .sm-center {
      justify-content: center;
    }

    .sm-right {
      justify-content: flex-end;
    }

    .sm-justified {
      justify-content: space-between;
    }

    .sm-top {
      align-items: flex-start;
    }

    .sm-middle {
      align-items: center;
    }

    .sm-bottom {
      align-items: flex-end;
    }
  }

  @media (min-width: 768px) {
    .md-left {
      justify-content: flex-start;
    }

    .md-center {
      justify-content: center;
    }

    .md-right {
      justify-content: flex-end;
    }

    .md-justified {
      justify-content: space-between;
    }

    .md-top {
      align-items: flex-start;
    }

    .md-middle {
      align-items: center;
    }

    .md-bottom {
      align-items: flex-end;
    }
  }

  @media (min-width: 992px) {
    .lg-left {
      justify-content: flex-start;
    }

    .lg-center {
      justify-content: center;
    }

    .lg-right {
      justify-content: flex-end;
    }

    .lg-justified {
      justify-content: space-between;
    }

    .lg-top {
      align-items: flex-start;
    }

    .lg-middle {
      align-items: center;
    }

    .lg-bottom {
      align-items: flex-end;
    }
  }

  @media (min-width: 1200px) {
    .xl-left {
      justify-content: flex-start;
    }

    .xl-center {
      justify-content: center;
    }

    .xl-right {
      justify-content: flex-end;
    }

    .xl-justified {
      justify-content: space-between;
    }

    .xl-top {
      align-items: flex-start;
    }

    .xl-middle {
      align-items: center;
    }

    .xl-bottom {
      align-items: flex-end;
    }
  }
</style>
