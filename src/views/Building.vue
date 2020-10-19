<template>
  <b-container fluid>
    <b-row class="page-default-template">
      <Info
        title="網站訊息"
        msg="網站建置或改版中，請耐心等候"
        title-class="bg-info"
      />
    </b-row>
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
