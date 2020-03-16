<template>
  <div
    v-clickOutside="onClose"
    :class="$style.wrapper"
  >
    <!-- @slot use this to pass a custom input  -->
    <slot
      id="input"
      :on-change="onInputChange"
      :on-key-down="onKeyDown"
      :on-focus="onFocus"
      :term="value"
      name="input"
    >
      <BaseInput
        :value="value"
        :class="[$style.baseInput, inputClass]"
        :name="inputName"
        :placeholder="placeholder"
        type="search"
        @change="onInputChange"
        @focus="onFocus"
        @keydown="onKeyDown"
      />
      <button
        :class="$style.buttonSearch"
        type="submit"
      >
        <BaseIcon
          :id="icons.searchIcon.id"
        />
      </button>
    </slot>
    <div
      v-if="showSuggestions && expanded"
      :class="[$style.expandedContainer, expandedClass]"
    >
      <ul
        :class="[$style.suggestions, listClass]"
        data-suggestions
      >
        <li
          v-for="(suggestion, index) in suggestions"
          :key="suggestion[itemKey]"
          :class="[
            $style.suggestion, { [$style.hovered]: suggestion.selected, [hoveredClass]: suggestion.selected },
            listItemClass
          ]"
          :data-suggestion-value="index"
        >
          <!-- @slot use this to custom the items in list of suggestions  -->
          <slot
            :suggestion="suggestion"
            name="listItem"
            :on-click="onClick"
          >
            <span v-html="suggestion.highlight"></span>
            <BaseIcon
              :id="icons.nextIcon.id"
              :class="$style.suggestionIcon"
            />
          </slot>
        </li>
      </ul>
      <slot
        v-if="suggestions.length === 0"
        name="placeholderSuggestion"
      >
      </slot>
      <slot
        name="footerListSuggestions"
      >
      </slot>
    </div>
  </div>
</template>

<script>
  import BaseInput from '../BaseInput';
  import BaseIcon from '../BaseIcon';
  import clickOutside from './../../../directives/click-outside';
  import searchIcon from '../../../icons/search.icon.svg';
  import nextIcon from '../../../icons/next.icon.svg';

  const selectSuggestions = (suggestions, indexToSelect) => suggestions.map((s, i) => ({
    ...s,
    selected: i === indexToSelect,
  }));

  const getSuggestionIndex = (suggestions, { selected, action }) => {
    if (action === 'prev') {
      if (selected === 0) return suggestions.length - 1;
      return selected - 1;
    }

    if (selected === suggestions.length - 1) return 0;
    return selected + 1;
  };

  export default {
    name: 'Autocomplete',

    components: { BaseInput, BaseIcon },

    directives: {
      clickOutside,
    },

    props: {
      expanded: {
        type: Boolean,
        default: true,
      },

      cacheKey: {
        type: String,
        default: 'default',
      },

      getSuggestions: {
        type: Function,
        required: true,
      },

      itemKey: {
        type: String,
        default: 'id',
      },

      inputClass: {
        type: Array,
        default: () => [],
      },

      expandedClass: {
        type: Array,
        default: () => [],
      },

      listClass: {
        type: Array,
        default: () => [],
      },

      listItemClass: {
        type: Array,
        default: () => [],
      },

      inputName: {
        type: String,
        default: '',
      },

      term: {
        type: String,
        default: '',
      },

      placeholder: {
        type: String,
        default: '',
      },

      suggestionKey: {
        type: String,
        default: 'name',
      },

      clearSuggestions: {
        type: Boolean,
        default: false,
      },

      hoveredClass: {
        type: Array,
        default: () => [],
      },
    },

    data() {
      return {
        value: '',
        inputedTerm: '',
        suggestions: [],
        showSuggestions: false,
        hovered: null,
        suggestionsCache: {},
      };
    },

    computed: {
      selectedSuggestionIndex() {
        return this.suggestions.findIndex(s => s.selected);
      },

      icons() {
        return {
          searchIcon,
          nextIcon,
        };
      },
    },

    watch: {
      cacheKey() {
        this.onInputChange({ value: this.value });
      },

      term(value) {
        this.value = value;
      },
    },

    mounted() {
      this.value = this.term;
    },

    methods: {
      onClick(ev) {
        this.showSuggestions = false;
        this.value = ev[this.suggestionKey];
        this.$emit('change', ev);
      },

      onInputChange(ev) {
        this.value = ev.value;

        if (
          this.suggestionsCache[this.cacheKey] &&
          this.suggestionsCache[this.cacheKey][this.value] &&
          this.suggestionsCache[this.cacheKey][this.value].length > 0
        ) {
          this.suggestions = this.suggestionsCache[this.cacheKey][this.value];
          this.showSuggestions = true;
          return;
        }

        if (this.value && this.value.length >= 3) {
          if (this.$slots.placeholderSuggestion) this.suggestions = [];

          this.showSuggestions = true;
          this.inputedTerm = ev.value;
          Promise.resolve(this.getSuggestions(ev)).then((suggestions) => {
            this.showSuggestions = true;
            this.suggestions = suggestions.map(suggestion => ({
              ...suggestion,
              highlight: this.highlighter({
                term: this.value,
                word: suggestion[this.suggestionKey],
              }),
              selected: false,
            }));
            if (this.suggestionsCache[this.cacheKey]) {
              this.suggestionsCache[this.cacheKey][this.value] = this.suggestions;
            } else {
              this.suggestionsCache[this.cacheKey] = { [this.value]: this.suggestions };
            }
          }).catch(() => {
            if (this.$slots.placeholderSuggestion) this.suggestions = [];
          });
        } else {
          this.suggestions = [];
          this.showSuggestions = false;
        }
      },

      highlighter({ term, word }) {
        return word.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), match => `<strong>${match}</strong>`);
      },

      populateTerm() {
        this.value = this.suggestions[this.selectedSuggestionIndex]
          ? this.suggestions[this.selectedSuggestionIndex][this.suggestionKey]
          : this.inputedTerm;
      },

      onKeyDown({ event }) {
        if (!this.suggestions.length) return;

        const actions = {
          Escape: () => {
            /**
              * When user press esc
              * @event escape
            */
            this.$emit('escape');
            this.showSuggestions = false;
          },
          ArrowUp: () => {
            this.nagivate('prev');
            this.populateTerm();
          },
          ArrowDown: () => {
            this.nagivate('next');
            this.populateTerm();
          },
          Enter: () => this.onChange(event),
          Tab: () => {
            if (this.selectedSuggestionIndex !== -1) {
              this.onChange();
            }
          },
        };

        if (Object.keys(actions).includes(event.code)) actions[event.code]();
      },

      nagivate(direction) {
        const { length } = this.suggestions;
        const nextOptionIndex = direction === 'next' ? 0 : length - 1;
        const selected = this.selectedSuggestionIndex;
        const index = getSuggestionIndex(this.suggestions, {
          selected,
          action: direction,
        });

        if (direction === 'prev' && nextOptionIndex === length - 1 && selected === 0) {
          this.suggestions = selectSuggestions(this.suggestions);
          return;
        }

        if (direction === 'next' && selected === length - 1) {
          this.suggestions = selectSuggestions(this.suggestions);
          return;
        }

        if (direction === 'prev' && selected === -1 && nextOptionIndex === length - 1) {
          this.suggestions = selectSuggestions(this.suggestions, nextOptionIndex);
          this.$nextTick(() => this.scrollToOption(nextOptionIndex));
          this.hovered = this.selectedSuggestionIndex;
          return;
        }

        if (nextOptionIndex >= 0 && nextOptionIndex <= length - 1) {
          this.suggestions = selectSuggestions(this.suggestions, index);
          this.hovered = this.selectedSuggestionIndex;
          if (direction === 'prev') {
            this.$nextTick(() => this.scrollToOption(selected - 1));
          } else {
            this.$nextTick(() => this.scrollToOption(selected + 1));
          }
        }
      },

      scrollToOption(optionValue) {
        const $option = this.$el.querySelector(`[data-suggestion-value="${optionValue}"]`);
        const $options = this.$el.querySelector('[data-suggestions]');

        if ($option.offsetTop < $options.scrollTop) {
          $options.scrollTop = $option.offsetTop;
        } else if ($option.offsetTop + $option.clientHeight > $options.clientHeight) {
          $options.scrollTop = ($option.offsetTop + $option.clientHeight) - $options.clientHeight;
        }
      },

      onClose() {
        /**
          * When user clicks outside
          * @event close
        */

        if ((this.showSuggestions || this.expanded)) {
          if (this.clearSuggestions) this.suggestions = [];

          this.$emit('close');
          this.showSuggestions = false;
        }
      },

      onChange() {
        if (this.suggestions[this.selectedSuggestionIndex]) {
          /**
            * When user navigate in list of options with kayboard and press enter
            * @event change
          */
          this.$emit('change', this.suggestions[this.selectedSuggestionIndex]);
          this.showSuggestions = false;
        } else {
          /**
            * When user press enter and dont have option selected
            * @event submit
          */
          this.$emit('submit', this.value);
        }
      },

      onFocus() {
        if (!this.clearSuggestions) {
          this.onInputChange({ value: this.value });
          this.showSuggestions = true;
        }
        /**
          * When user press in input
          * @event focus
        */
        this.$emit('focus');
      },
    },
  };
</script>

<style module>
  .wrapper {
    position: relative;
  }

  .baseInput input::placeholder {
    color: #8C8C8C;
  }

  .baseInput svg {
    font-size: 25px;
  }

  .baseInput input {
    background-color: transparent;
    width: 100%;
    height: 38px;
    border-radius: 4px;
    color: #333333;
    font-family: 'Helvetica', sans-serif;
    font-size: 14px;
    padding: 0 10px;
  }

  .expandedContainer {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 9999;
    border: 1px solid #DADADA;
    border-top: 0;
    background: #FFF;
    box-shadow: inset 0px 2px 4px -2px rgba(0, 0, 0, 0.29);
  }

  .suggestions {
    margin: 0;
    padding: 0;
  }

  .suggestion {
    cursor: pointer;
    border-bottom: 1px solid #DDD;
    padding: 10px;
    display: flex;
    justify-content: space-between
  }

  .suggestionTextWrapper {
    flex-direction: column;
    display: flex;
  }

  .suggestionIcon {
    color: #dadada;
  }

  .suggestion:hover, .hovered {
    background-color: #e6f7f2;
  }

  .buttonSearch {
    background: transparent;
    border: none;
    color: #999999;
    position: absolute;
    top: 6px;
    right: 0;
  }
</style>
