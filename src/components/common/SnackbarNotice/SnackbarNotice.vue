<template>
  <BaseNotice
    v-bind="props"
    :type="baseNoticeType"
    :timeout="timeout"
    :snackbar="true"
    :auto-close="true"
    @hide="$emit('hide')"
  />
</template>

<script>
import BaseNotice from '../BaseNotice';
import thumbsUpIcon from '../../../icons/thumb-up.icon.svg';
import infoIcon from '../../../icons/info.icon.svg';

export default {
  name: 'SnackbarNotice',
  components: { BaseNotice },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['success', 'error', 'warning'].includes(value);
      },
    },

    content: {
      type: [String, Object],
      required: true,
      validator(value) {
        if (typeof value === 'string') return true;

        const keys = Object.keys(value);
        return keys.includes('title') && keys.includes('message');
      },
    },

    timeout: {
      type: Number,
      default: 5000,
    },
  },

  computed: {
    props() {
      if (typeof this.content === 'string') {
        return { title: this.content };
      }

      const { title, message } = this.content;
      return { title, message };
    },

    icon() {
      return this.type === 'success' ? thumbsUpIcon : infoIcon;
    },

    baseNoticeType() {
      if (this.type === 'error') return 'danger';
      return this.type;
    },
  },
};
</script>
