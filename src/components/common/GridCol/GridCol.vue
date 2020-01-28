<template>
  <div :class="columnClasses" :style="{padding}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GridCol',
    props: {
      span: {
        type: [Number, Object],
      },
      offset: {
        type: [Number, Object],
      },
      order: {
        type: [Number, Object],
        default: 1,
      },
    },
    computed: {
      columnClasses() {
        const classes = [this.$style.col];

        if (typeof this.span === 'number') {
          classes.push(this.$style[`col${this.span}`]);
        } else if (typeof this.span === 'object') {
          Object.keys(this.span).forEach((breakpointName) => {
            const breakpointValue = this.span[breakpointName];
            classes.push(this.$style[`col-${breakpointName}${breakpointValue}`]);
          });
        }

        if (typeof this.offset === 'number') {
          classes.push(this.$style[`col-offset${this.offset}`]);
        } else if (typeof this.offset === 'object') {
          Object.keys(this.offset).forEach((breakpointName) => {
            const breakpointValue = this.offset[breakpointName];
            classes.push(this.$style[`col-offset-${breakpointName}-${breakpointValue}`]);
          });
        }

        if (typeof this.order === 'number') {
          classes.push(this.$style[`order${this.order}`]);
        } else if (typeof this.order === 'object') {
          Object.keys(this.order).forEach((breakpointName) => {
            const breakpointValue = this.order[breakpointName];
            classes.push(this.$style[`order-${breakpointName}-${breakpointValue}`]);
          });
        }

        return classes;
      },
      padding() {
        return `${0} ${this.$parent.gutter / 2}px`;
      },
    },
  };
</script>

<style module>
  .col {
    padding: 0 15px;
    flex-grow: 1;
  }

  .col1 {
    composes: col;
    flex-grow: 0;
    width: 8.33333333%;
  }

  .col-offset1 {
    margin-left: 8.33333333%;
  }

  .order1 {
    order: 1;
  }

  .col2 {
    composes: col;
    flex-grow: 0;
    width: 16.66666667%;
  }

  .col-offset2 {
    margin-left: 16.66666667%;
  }

  .order2 {
    order: 2;
  }

  .col3 {
    composes: col;
    flex-grow: 0;
    width: 25%;
  }

  .col-offset3 {
    margin-left: 25%;
  }

  .order3 {
    order: 3;
  }

  .col4 {
    composes: col;
    flex-grow: 0;
    width: 33.33333333%;
  }

  .col-offset4 {
    margin-left: 33.33333333%;
  }

  .order4 {
    order: 4;
  }

  .col5 {
    composes: col;
    flex-grow: 0;
    width: 41.66666667%;
  }

  .col-offset5 {
    margin-left: 41.66666667%;
  }

  .order5 {
    order: 5;
  }

  .col6 {
    composes: col;
    flex-grow: 0;
    width: 50%;
  }

  .col-offset6 {
    margin-left: 50%;
  }

  .order6 {
    order: 6;
  }

  .col7 {
    composes: col;
    flex-grow: 0;
    width: 58.33333333%;
  }

  .col-offset7 {
    margin-left: 58.33333333%;
  }

  .order7 {
    order: 7;
  }

  .col8 {
    composes: col;
    flex-grow: 0;
    width: 66.66666667%;
  }

  .col-offset8 {
    margin-left: 66.66666667%;
  }

  .order8 {
    order: 8;
  }

  .col9 {
    composes: col;
    flex-grow: 0;
    width: 75%;
  }

  .col-offset9 {
    margin-left: 75%;
  }

  .order9 {
    order: 9;
  }

  .col10 {
    composes: col;
    flex-grow: 0;
    width: 83.33333333%;
  }

  .col-offset10 {
    margin-left: 83.33333333%;
  }

  .order10 {
    order: 10;
  }

  .col11 {
    composes: col;
    flex-grow: 0;
    width: 91.66666667%;
  }

  .col-offset11 {
    margin-left: 91.66666667%;
  }

  .order11 {
    order: 11;
  }

  .col12 {
    composes: col;
    flex-grow: 0;
    width: 100%;
  }

  .col-offset12 {
    margin-left: 100%;
  }

  .order12 {
    order: 12;
  }

  @media (min-width: 0) {
    .col-xs1 {
      composes: col;
      flex-grow: 0;
      width: 8.33333333%;
    }

    .col-offset-xs-1 {
      margin-left: 8.33333333%;
    }

    .order-xs-1 {
      order: 1;
    }

    .col-xs2 {
      composes: col;
      flex-grow: 0;
      width: 16.66666667%;
    }

    .col-offset-xs-2 {
      margin-left: 16.66666667%;
    }

    .order-xs-2 {
      order: 2;
    }

    .col-xs3 {
      composes: col;
      flex-grow: 0;
      width: 25%;
    }

    .col-offset-xs-3 {
      margin-left: 25%;
    }

    .order-xs-3 {
      order: 3;
    }

    .col-xs4 {
      composes: col;
      flex-grow: 0;
      width: 33.33333333%;
    }

    .col-offset-xs-4 {
      margin-left: 33.33333333%;
    }

    .order-xs-4 {
      order: 4;
    }

    .col-xs5 {
      composes: col;
      flex-grow: 0;
      width: 41.66666667%;
    }

    .col-offset-xs-5 {
      margin-left: 41.66666667%;
    }

    .order-xs-5 {
      order: 5;
    }

    .col-xs6 {
      composes: col;
      flex-grow: 0;
      width: 50%;
    }

    .col-offset-xs-6 {
      margin-left: 50%;
    }

    .order-xs-6 {
      order: 6;
    }

    .col-xs7 {
      composes: col;
      flex-grow: 0;
      width: 58.33333333%;
    }

    .col-offset-xs-7 {
      margin-left: 58.33333333%;
    }

    .order-xs-7 {
      order: 7;
    }

    .col-xs8 {
      composes: col;
      flex-grow: 0;
      width: 66.66666667%;
    }

    .col-offset-xs-8 {
      margin-left: 66.66666667%;
    }

    .order-xs-8 {
      order: 8;
    }

    .col-xs9 {
      composes: col;
      flex-grow: 0;
      width: 75%;
    }

    .col-offset-xs-9 {
      margin-left: 75%;
    }

    .order-xs-9 {
      order: 9;
    }

    .col-xs10 {
      composes: col;
      flex-grow: 0;
      width: 83.33333333%;
    }

    .col-offset-xs-10 {
      margin-left: 83.33333333%;
    }

    .order-xs-10 {
      order: 10;
    }

    .col-xs11 {
      composes: col;
      flex-grow: 0;
      width: 91.66666667%;
    }

    .col-offset-xs-11 {
      margin-left: 91.66666667%;
    }

    .order-xs-11 {
      order: 11;
    }

    .col-xs12 {
      composes: col;
      flex-grow: 0;
      width: 100%;
    }

    .col-offset-xs-12 {
      margin-left: 100%;
    }

    .order-xs-12 {
      order: 12;
    }
  }
  @media (min-width: 576px) {
    .col-sm1 {
      composes: col;
      flex-grow: 0;
      width: 8.33333333%;
    }

    .col-offset-sm-1 {
      margin-left: 8.33333333%;
    }

    .order-sm-1 {
      order: 1;
    }

    .col-sm2 {
      composes: col;
      flex-grow: 0;
      width: 16.66666667%;
    }

    .col-offset-sm-2 {
      margin-left: 16.66666667%;
    }

    .order-sm-2 {
      order: 2;
    }

    .col-sm3 {
      composes: col;
      flex-grow: 0;
      width: 25%;
    }

    .col-offset-sm-3 {
      margin-left: 25%;
    }

    .order-sm-3 {
      order: 3;
    }

    .col-sm4 {
      composes: col;
      flex-grow: 0;
      width: 33.33333333%;
    }

    .col-offset-sm-4 {
      margin-left: 33.33333333%;
    }

    .order-sm-4 {
      order: 4;
    }

    .col-sm5 {
      composes: col;
      flex-grow: 0;
      width: 41.66666667%;
    }

    .col-offset-sm-5 {
      margin-left: 41.66666667%;
    }

    .order-sm-5 {
      order: 5;
    }

    .col-sm6 {
      composes: col;
      flex-grow: 0;
      width: 50%;
    }

    .col-offset-sm-6 {
      margin-left: 50%;
    }

    .order-sm-6 {
      order: 6;
    }

    .col-sm7 {
      composes: col;
      flex-grow: 0;
      width: 58.33333333%;
    }

    .col-offset-sm-7 {
      margin-left: 58.33333333%;
    }

    .order-sm-7 {
      order: 7;
    }

    .col-sm8 {
      composes: col;
      flex-grow: 0;
      width: 66.66666667%;
    }

    .col-offset-sm-8 {
      margin-left: 66.66666667%;
    }

    .order-sm-8 {
      order: 8;
    }

    .col-sm9 {
      composes: col;
      flex-grow: 0;
      width: 75%;
    }

    .col-offset-sm-9 {
      margin-left: 75%;
    }

    .order-sm-9 {
      order: 9;
    }

    .col-sm10 {
      composes: col;
      flex-grow: 0;
      width: 83.33333333%;
    }

    .col-offset-sm-10 {
      margin-left: 83.33333333%;
    }

    .order-sm-10 {
      order: 10;
    }

    .col-sm11 {
      composes: col;
      flex-grow: 0;
      width: 91.66666667%;
    }

    .col-offset-sm-11 {
      margin-left: 91.66666667%;
    }

    .order-sm-11 {
      order: 11;
    }

    .col-sm12 {
      composes: col;
      flex-grow: 0;
      width: 100%;
    }

    .col-offset-sm-12 {
      margin-left: 100%;
    }

    .order-sm-12 {
      order: 12;
    }
  }
  @media (min-width: 768px) {
    .col-md1 {
      composes: col;
      flex-grow: 0;
      width: 8.33333333%;
    }

    .col-offset-md-1 {
      margin-left: 8.33333333%;
    }

    .order-md-1 {
      order: 1;
    }

    .col-md2 {
      composes: col;
      flex-grow: 0;
      width: 16.66666667%;
    }

    .col-offset-md-2 {
      margin-left: 16.66666667%;
    }

    .order-md-2 {
      order: 2;
    }

    .col-md3 {
      composes: col;
      flex-grow: 0;
      width: 25%;
    }

    .col-offset-md-3 {
      margin-left: 25%;
    }

    .order-md-3 {
      order: 3;
    }

    .col-md4 {
      composes: col;
      flex-grow: 0;
      width: 33.33333333%;
    }

    .col-offset-md-4 {
      margin-left: 33.33333333%;
    }

    .order-md-4 {
      order: 4;
    }

    .col-md5 {
      composes: col;
      flex-grow: 0;
      width: 41.66666667%;
    }

    .col-offset-md-5 {
      margin-left: 41.66666667%;
    }

    .order-md-5 {
      order: 5;
    }

    .col-md6 {
      composes: col;
      flex-grow: 0;
      width: 50%;
    }

    .col-offset-md-6 {
      margin-left: 50%;
    }

    .order-md-6 {
      order: 6;
    }

    .col-md7 {
      composes: col;
      flex-grow: 0;
      width: 58.33333333%;
    }

    .col-offset-md-7 {
      margin-left: 58.33333333%;
    }

    .order-md-7 {
      order: 7;
    }

    .col-md8 {
      composes: col;
      flex-grow: 0;
      width: 66.66666667%;
    }

    .col-offset-md-8 {
      margin-left: 66.66666667%;
    }

    .order-md-8 {
      order: 8;
    }

    .col-md9 {
      composes: col;
      flex-grow: 0;
      width: 75%;
    }

    .col-offset-md-9 {
      margin-left: 75%;
    }

    .order-md-9 {
      order: 9;
    }

    .col-md10 {
      composes: col;
      flex-grow: 0;
      width: 83.33333333%;
    }

    .col-offset-md-10 {
      margin-left: 83.33333333%;
    }

    .order-md-10 {
      order: 10;
    }

    .col-md11 {
      composes: col;
      flex-grow: 0;
      width: 91.66666667%;
    }

    .col-offset-md-11 {
      margin-left: 91.66666667%;
    }

    .order-md-11 {
      order: 11;
    }

    .col-md12 {
      composes: col;
      flex-grow: 0;
      width: 100%;
    }

    .col-offset-md-12 {
      margin-left: 100%;
    }

    .order-md-12 {
      order: 12;
    }
  }
  @media (min-width: 992px) {
    .col-lg1 {
      composes: col;
      flex-grow: 0;
      width: 8.33333333%;
    }

    .col-offset-lg-1 {
      margin-left: 8.33333333%;
    }

    .order-lg-1 {
      order: 1;
    }

    .col-lg2 {
      composes: col;
      flex-grow: 0;
      width: 16.66666667%;
    }

    .col-offset-lg-2 {
      margin-left: 16.66666667%;
    }

    .order-lg-2 {
      order: 2;
    }

    .col-lg3 {
      composes: col;
      flex-grow: 0;
      width: 25%;
    }

    .col-offset-lg-3 {
      margin-left: 25%;
    }

    .order-lg-3 {
      order: 3;
    }

    .col-lg4 {
      composes: col;
      flex-grow: 0;
      width: 33.33333333%;
    }

    .col-offset-lg-4 {
      margin-left: 33.33333333%;
    }

    .order-lg-4 {
      order: 4;
    }

    .col-lg5 {
      composes: col;
      flex-grow: 0;
      width: 41.66666667%;
    }

    .col-offset-lg-5 {
      margin-left: 41.66666667%;
    }

    .order-lg-5 {
      order: 5;
    }

    .col-lg6 {
      composes: col;
      flex-grow: 0;
      width: 50%;
    }

    .col-offset-lg-6 {
      margin-left: 50%;
    }

    .order-lg-6 {
      order: 6;
    }

    .col-lg7 {
      composes: col;
      flex-grow: 0;
      width: 58.33333333%;
    }

    .col-offset-lg-7 {
      margin-left: 58.33333333%;
    }

    .order-lg-7 {
      order: 7;
    }

    .col-lg8 {
      composes: col;
      flex-grow: 0;
      width: 66.66666667%;
    }

    .col-offset-lg-8 {
      margin-left: 66.66666667%;
    }

    .order-lg-8 {
      order: 8;
    }

    .col-lg9 {
      composes: col;
      flex-grow: 0;
      width: 75%;
    }

    .col-offset-lg-9 {
      margin-left: 75%;
    }

    .order-lg-9 {
      order: 9;
    }

    .col-lg10 {
      composes: col;
      flex-grow: 0;
      width: 83.33333333%;
    }

    .col-offset-lg-10 {
      margin-left: 83.33333333%;
    }

    .order-lg-10 {
      order: 10;
    }

    .col-lg11 {
      composes: col;
      flex-grow: 0;
      width: 91.66666667%;
    }

    .col-offset-lg-11 {
      margin-left: 91.66666667%;
    }

    .order-lg-11 {
      order: 11;
    }

    .col-lg12 {
      composes: col;
      flex-grow: 0;
      width: 100%;
    }

    .col-offset-lg-12 {
      margin-left: 100%;
    }

    .order-lg-12 {
      order: 12;
    }
  }
  @media (min-width: 1200px) {
    .col-xl1 {
      composes: col;
      flex-grow: 0;
      width: 8.33333333%;
    }

    .col-offset-xl-1 {
      margin-left: 8.33333333%;
    }

    .order-xl-1 {
      order: 1;
    }

    .col-xl2 {
      composes: col;
      flex-grow: 0;
      width: 16.66666667%;
    }

    .col-offset-xl-2 {
      margin-left: 16.66666667%;
    }

    .order-xl-2 {
      order: 2;
    }

    .col-xl3 {
      composes: col;
      flex-grow: 0;
      width: 25%;
    }

    .col-offset-xl-3 {
      margin-left: 25%;
    }

    .order-xl-3 {
      order: 3;
    }

    .col-xl4 {
      composes: col;
      flex-grow: 0;
      width: 33.33333333%;
    }

    .col-offset-xl-4 {
      margin-left: 33.33333333%;
    }

    .order-xl-4 {
      order: 4;
    }

    .col-xl5 {
      composes: col;
      flex-grow: 0;
      width: 41.66666667%;
    }

    .col-offset-xl-5 {
      margin-left: 41.66666667%;
    }

    .order-xl-5 {
      order: 5;
    }

    .col-xl6 {
      composes: col;
      flex-grow: 0;
      width: 50%;
    }

    .col-offset-xl-6 {
      margin-left: 50%;
    }

    .order-xl-6 {
      order: 6;
    }

    .col-xl7 {
      composes: col;
      flex-grow: 0;
      width: 58.33333333%;
    }

    .col-offset-xl-7 {
      margin-left: 58.33333333%;
    }

    .order-xl-7 {
      order: 7;
    }

    .col-xl8 {
      composes: col;
      flex-grow: 0;
      width: 66.66666667%;
    }

    .col-offset-xl-8 {
      margin-left: 66.66666667%;
    }

    .order-xl-8 {
      order: 8;
    }

    .col-xl9 {
      composes: col;
      flex-grow: 0;
      width: 75%;
    }

    .col-offset-xl-9 {
      margin-left: 75%;
    }

    .order-xl-9 {
      order: 9;
    }

    .col-xl10 {
      composes: col;
      flex-grow: 0;
      width: 83.33333333%;
    }

    .col-offset-xl-10 {
      margin-left: 83.33333333%;
    }

    .order-xl-10 {
      order: 10;
    }

    .col-xl11 {
      composes: col;
      flex-grow: 0;
      width: 91.66666667%;
    }

    .col-offset-xl-11 {
      margin-left: 91.66666667%;
    }

    .order-xl-11 {
      order: 11;
    }

    .col-xl12 {
      composes: col;
      flex-grow: 0;
      width: 100%;
    }

    .col-offset-xl-12 {
      margin-left: 100%;
    }

    .order-xl-12 {
      order: 12;
    }
  }
</style>
