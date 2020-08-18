<template>
  <div :class="$style.errorBox">
    <span :class="$style.title">
      {{ title }}
    </span>

    <div :class="$style.errorsBlock">
      <ul :class="$style.errorList">
        <li
          v-for="(error, index) in errorList.withKeys"
          :key="'withKeys-' + index"
        >
          {{ error.field }}

          <ul :class="$style.fieldErrorList">
            <li
              v-for="(fieldErr, fieldErrIndex) in error.errors"
              :key="fieldErrIndex"
            >
              {{ fieldErr }}
            </li>
          </ul>
        </li>

        <li
          v-for="(error, index) in errorList.withoutKeys"
          :key="'withoutKeys-' + index"
        >
          {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormError',
  props: {
    title: {
      type: String,
    },

    errors: {
      type: [String, Array, Object],
      default: () => [],
    },

    blackList: {
      type: Array,
      default: () => [],
    },

    scrollToSelf: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    errorList() {
      const errors = typeof this.errors === 'string' ? [this.errors] : this.errors;

      const errorList = {
        withKeys: [],
        withoutKeys: [],
      };

      if (Array.isArray(errors)) {
        return {
          ...errorList,
          withoutKeys: errors,
        };
      }

      return Object.keys(errors).reduce((acc, errKey) => {
        if (this.blackList.includes(errKey)) {
          acc.withoutKeys = acc.withoutKeys.concat(errors[errKey]);
        } else {
          acc.withKeys = acc.withKeys.concat({
            field: errKey,
            errors: typeof errors[errKey] === 'string' ? [errors[errKey]] : errors[errKey],
          });
        }

        return acc;
      }, errorList);
    },
  },

  mounted() {
    if (this.scrollToSelf) {
      window.scrollTo(0, this.$el.offsetTop - 20);
    }
  },
};
</script>

<style module>
  .errorBox {
    background: #d30b3f;
    padding: 15px 28px 18px;
    color: #FFF;
  }

  .title {
    font-weight: bold;
    font-size: 15px;
    display: block;
  }

  .errorsBlock {
    margin-top: 10px;
  }

  .list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .errorList {
    composes: list;
  }

  .errorList > li {
    padding-left: 15px;
    margin-bottom: 8px;
    position: relative;
    font-weight: bold;
  }

  .errorList > li::before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    top: 8px;
    left: 0;
    background: white;
  }

  .errorList > li:last-child {
    margin-bottom: 0;
  }

  .fieldErrorList {
    composes: list;
  }

  .fieldErrorList > li::before {
    content: '- '
  }

  .fieldErrorList > li {
    padding-left: 0;
    margin-top: 3px;
    font-size: 14px;
    font-weight: 400;
  }
</style>
