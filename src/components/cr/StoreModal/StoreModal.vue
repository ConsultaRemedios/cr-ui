<template>
  <StoreBaseModal
    title="Dados do vendedor"
    :name="name"
    :logoPath="logoPath"
    :isLoading="isLoading"
    @close="$emit('close')"
  >
    <div :class="$style.fields">
      <div v-for="(field, i) in informations" :key="i" :class="$style.field">
        <span :class="$style.fieldTitle">{{ field.title }}</span>
        <div :class="$style.fieldContent" v-html="field.content" />
      </div>
    </div>

    <slot></slot>
  </StoreBaseModal>
</template>

<script>
  import StoreBaseModal from '../StoreBaseModal';

  export default {
    name: 'StoreModal',
    components: { StoreBaseModal },
    props: {
      name: {
        type: String,
        default: '',
      },
      logoPath: {
        type: String,
        default: '',
      },
      informations: {
        type: Array,
        default: () => [],
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style module>
  .field {
    margin-bottom: 15px;
  }

  .field:last-child {
    margin-bottom: 0;
  }

  .fieldTitle {
    color: #333333;
    display: block;
    font-weight: 800;
    margin-bottom: 2px;
    font-size: 14px;
  }

  .fieldContent > p {
    color: #333333;
    font-weight: normal;
    margin: 0 0 10px;
    font-size: 14px;
  }

  .fieldContent p:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    .fields {
      columns: 2;
      column-gap: 30px;
    }

    .field {
      display: inline-block;
      width: 100%;
    }
  }
</style>
