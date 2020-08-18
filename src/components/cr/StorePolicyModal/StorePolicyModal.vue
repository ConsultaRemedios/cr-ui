<template>
  <StoreBaseModal
    :title="title"
    :name="name"
    :logo-path="logoPath"
    :is-loading="isLoading"
    @close="$emit('close')"
  >
    <div v-html="information" />
  </StoreBaseModal>
</template>

<script>
import StoreBaseModal from '../StoreBaseModal';

export default {
  name: 'StorePolicyModal',
  components: { StoreBaseModal },

  props: {
    title: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      default: '',
    },

    logoPath: {
      type: String,
      default: '',
    },

    information: {
      type: String,
      default: '',
    },

    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
