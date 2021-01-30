<template>
  <b-container fluid>
    <b-row class="page-default-template text-center">
      <b-col cols="12">
        <h1 class="warning">
          <b-icon icon="exclamation-circle" variant="warning"></b-icon>
          WARNING
        </h1>
      </b-col>
      <b-col cols="12">
        <Info
          title="偷偷告訴你"
          msg="童鞋，此頁面不存在，請勿嘗試偷渡..."
          title-class="bg-danger"
          content-class="bg-dark"
          id="app"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Info from '../components/Info.vue'
export default {
  components: { Info }
}
</script>

<style lang="scss" scope>
html, body {
  margin: 0; height: 100%; overflow: hidden;
  background-color: $bgc-body;
}

.warning {
  position: relative;
  user-select: none;
  transform: translateX(-5px);
  animation: goRound 2s infinite linear;
  // transform: rotate(0deg) translateX(-5px) rotate(0deg);
}

@keyframes goRound {
  from { transform: rotate(0deg) translateX(-5px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(-5px) rotate(-360deg); }
}
</style>
