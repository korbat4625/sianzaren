<template>
  <div class="article__blocks">
    <div class="article__blocks__block" v-for="article in filterPosts" :key="article.id">
      <div class="article__blocks__block_title card-title">
        <h3>{{ article.contentData.title }}</h3>
      </div>
      <div class="article__blocks__block_content">
        <p>{{ article.aboutCategory.tags }}</p>
      </div>
      <div class="article__blocks__block_tags">
        <p>{{ article.contentData.stopOnMore }}</p>
      </div>
      <div class="goto" @click="gotoArticle(article.id)"  :data-articleId="article.id">
        <p> >> 繼續閱讀</p>
      </div>
    </div>

    <div class="article__tags--expose" v-show="false">
      <slot name="tagsFiltered" :tagsFiltered="tagsFiltered"></slot>
    </div>
  </div>
</template>

<script>
import firebase from '../Model/FirebaseModel.vue'
export default {
  name: 'ArticleList',
  mixins: [firebase],
  props: ['chooseTag'],
  data () {
    return {
      mainPosts: [],
      tags: [],
      tagsFiltered: null,
      filterPosts: []
    }
  },

  watch: {
    chooseTag: function (newVal, oldVal) {
      console.log(newVal)
      if (newVal === 'all') {
        this.filterPosts = this.mainPosts
        return 'done'
      }
      const filterPost = this.mainPosts.filter(ele => {
        return ele.aboutCategory.tags.indexOf(newVal) !== -1
      })
      this.filterPosts = filterPost
      console.log('目前文章:', filterPost)
    }
  },

  created () {
    const buffer = []
    this.F_getCollectionDocsSort('posts', { where: 'contentData.createdAt', order: 'desc' }).then(docs => {
      this.mainPosts = docs
      this.filterPosts = JSON.parse(JSON.stringify(this.mainPosts))

      this.tags = this.filterPosts.map(ele => {
        return ele.aboutCategory.tags
      })

      this.tags.forEach(ele => [
        buffer.push(...ele)
      ])

      this.tagsFiltered = new Set(buffer)
      this.tagsFiltered = Array.from(this.tagsFiltered)
    })
  },

  methods: {
    gotoArticle (articleID) {
      const targetArticle = this.filterPosts.find(ele => {
        return articleID === ele.id
      })
      this.$router.push(`/article/${targetArticle.id}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.article__blocks {
  padding: 2rem;
  display: grid;
  grid-template-rows: auto;

  & > .article__blocks__block {
    position: relative;
    margin: 2rem;
    border: solid #aaa 1px;
    border-radius: 5px;
    padding: 1rem;
    height: 200px;
    box-shadow: 2px 2px 1px 0px #444;

    &:hover {
      background-color: #ddd;
    }
    & > div {
      user-select: none;
    }

    .article__blocks__block_title {
      margin: .5rem
    }

    .article__blocks__block_content {
      margin: .5rem
    }

    .goto {
      position: absolute;
      right: 5%;
      bottom: 5%;
      cursor: pointer;

      &:hover {
        color: #333;
        border-bottom: 1px solid brown;
      }

      &:active {
        border-bottom: 0;
      }
    }
  }
}
</style>
