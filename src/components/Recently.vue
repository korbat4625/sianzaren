<template>
  <div class="recentlyArticle">
    <div class="recentlyArticle__content">這邊抓取近期文章</div>
  </div>
</template>

<script>
export default {
  name: 'Recently'
}
</script>

<style lang="scss">
  .recentlyArticle {
    border: solid 1px #444;
    border-radius: 5px;
    padding: 2rem;
    margin-top: 4rem;
    .recentlyArticle__content {
      height: 600px;
    }
  }
</style>
