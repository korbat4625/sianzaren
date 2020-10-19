<template>
  <b-container fluid class="page-default-template">
    <Info
      title="網站訊息"
      msg="網站建置或改版中，預計年底上線請耐心等候..."
      title-class="bg-info"
    />
  </b-container>
</template>

<script>
import Info from '../components/Info.vue'
export default {
  components: { Info }
}
</script>

<style lang="scss">
</style>
