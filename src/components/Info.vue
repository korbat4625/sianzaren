<template>
  <div class="infoBlock" :class="pageLevelClass">
    <div class="title center" :class="titleClass">
      {{ title }}
    </div>
    <div class="content center" :class="contentClass">
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    pageLevelClass: {
      type: String,
      default: ''
    },
    titleClass: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
@import '../style/components/info';
</style>
