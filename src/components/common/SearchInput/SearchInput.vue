<template>
  <div :class="$style.container">
    <div
      v-if="showClearButton"
      :class="$style.iconWrapper"
      @click="onClickClearButton"
    >
      <BaseIcon
        :id="cancelIcon.id"
        :class="$style.cancelIcon"
      />
    </div>
    <form
      :class="$style.form"
      @submit.prevent="onSearch"
    >
      <input
        type="search"
        :class="$style.input"
        :value="inputValue"
        :placeholder="placeholder"
        @input="onInput"
      >
      <button :class="$style.buttonSearch">
        <BaseIcon
          :id="searchIcon.id"
          :class="$style.searchIcon"
        />
      </button>
    </form>
  </div>
</template>

<script>
  import BaseIcon from '../BaseIcon';
  import search from '../../../icons/search.icon.svg';
  import cancel from '../../../icons/cancel.icon.svg';

  export default {
    name: 'SearchInput',

    props: {
      value: {
        type: String,
        default: '',
      },

      placeholder: {
        type: String,
        default: 'Buscar...',
      },

      showClearButton: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        inputValue: '',
      };
    },

    methods: {
      onInput({ target }) {
        this.inputValue = target.value;
      },

      onSearch() {
        this.$emit('submit', { value: this.inputValue });
      },

      onClickClearButton() {
        this.$emit('click-clear-button');
      },
    },

    computed: {
      searchIcon() {
        return search;
      },

      cancelIcon() {
        return cancel;
      },
    },

    created() {
      if (this.value) {
        this.inputValue = this.value;
      }
    },

    components: {
      BaseIcon,
    },
  };
</script>

<style module>
  .container {
    position: relative;
  }

  .form {
    border: 1px solid #DADADA;
    border-radius: 3px;
  }

  .input {
    width: calc(100% - 20px);
    height: 45px;
    padding: 11px 15px;
    border: none;
    color: #333333;
    font-size: 15px;
    background-color: transparent;
    -webkit-appearance: none;
  }

  .input[placeholder] {
    text-overflow: ellipsis;
  }

  .input:focus {
    border-width: 2px;
    border-color: #00AAE5;
  }

  .iconWrapper + form > .input {
    padding-left: 40px;
  }

  .input::placeholder {
    color: #AAAAAA;
    opacity: 1;
  }

  .input::-webkit-search-cancel-button {
    display: none;
  }

  .input::-ms-clear{
    display: none;
  }

  .cancelIcon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #D30B3F;
    cursor: pointer;
  }

  .buttonSearch {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
  }

  .searchIcon {
    width: 20px;
    height: 20px;
    color: #999999;
    cursor: pointer;
  }
</style>
