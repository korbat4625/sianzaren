<template>
  <button type="button" class="btn" :class=" 'btn-' + dynamicClass" >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    variant: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    dynamicClass () {
      return this.variant
    }
  }
}
</script>

<style lang="scss">
.btn {
  border-radius: 5px;
  color: white;
  padding: .375rem .75rem;
  border: 1px solid transparent;
  box-shadow: 0 1px 1px 0px black;
}

// 定義各色塊
// 預設 = #6c757d ， success = #28a745 ， primary = #007bff ， danger = #dc3545

.btn-normal {
  background-color: #6c757d;
}

.btn-success {
  background-color: #28a745;
}

.btn-primary {
  background-color: #007bff;
}

.btn-danger {
  background-color: #dc3545;
}
</style>
