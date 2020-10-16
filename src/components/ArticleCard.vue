<template>
  <section class="sianzaren-card">
    <div class="sianzaren-card__title">
      {{ article.contentData.title }}
    </div>
    <div class="sianzaren-card__content">
      <div class="sianzaren-card__content__img">
          <img :src="articleImg" :alt="titleImageDescription">
          <p>{{ article.contentData.stopOnMore }}</p>
      </div>
    </div>
    <div class="sianzaren-card__footer">
      <div class="watched"></div>
      <div class="author">
        <img :src="authorImg" alt="這是作者的頭像">
      </div>
      <div class="tags">
        <label
            class="label-tag"
            :key="tag"
            v-for="tag in article.others.tags"
          >
            {{ tag }}
        </label>
      </div>
      <div><span class="goto" @click="gotoArticle(article.id)" :data-articleId="article.id">繼續閱讀</span></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: function () {
        return {}
      }
    },
    articleImg: {
      type: String,
      default: ''
    },
    titleImageDescription: {
      type: String,
      default: ''
    },
    authorImg: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  },
  methods: {
    gotoArticle (articleID) {
      this.$router.push(`/article/${articleID}`)
    }
  }
}
</script>

<style lang="scss">
.tags {
  display: flex;
  .label-tag {
    position: relative;
    background-color: #0089E0;
    padding: 5px;
    border-radius: 5px;
    color: white;
    text-align: center;
    margin: 5px;
  }
}
</style>
