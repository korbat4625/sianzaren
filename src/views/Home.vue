<template>
  <b-container class="pageHome">
    <b-row>
      <b-col cols="9"><Articles/></b-col>
      <b-col cols="3"><Recently/></b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Articles from '@/components/Articles.vue'
import Recently from '@/components/Recently.vue'

export default {
  name: 'Home',
  components: {
    Articles,
    Recently
  }
}
</script>

<style lang="scss" scoped>
</style>
