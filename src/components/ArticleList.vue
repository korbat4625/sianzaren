<template>
  <section class="article__blocks">
    <ArticleCard
      v-for="article in filterPosts"
      :article="article"
      :key="article.id"
      article-img="https://placekitten.com/380/200"
      title-image-description="a ate"
      :author-img="article.authorInfo.photoURL"
    >
    </ArticleCard>
    <section class="article__tags--expose" v-show="false">
      <slot name="tagsFiltered" :tagsFiltered="tagsFiltered"></slot>
    </section>
  </section>
</template>

<script>
import firebase from '@/Model/FirebaseModel.vue'
import ArticleCard from './ArticleCard'
// import { db } from '@/Model/FirebaseModel.js'
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

  components: {
    ArticleCard
  },

  watch: {
    chooseTag: function (newVal, oldVal) {
      if (newVal === 'all') {
        this.filterPosts = this.mainPosts
        return 'done'
      }
      const filterPost = this.mainPosts.filter(ele => {
        return ele.others.tags.indexOf(newVal) !== -1
      })
      this.filterPosts = filterPost
      console.log('目前文章:', filterPost)
    }
  },

  created () {
    const buffer = []
    this.F_getCollectionDocsSort('posts', { where: 'contentData.createdAt', order: 'desc' }).then(docs => {
      this.mainPosts = docs
      this.filterPosts = docs
      console.log(docs)
      this.tags = this.filterPosts.map(ele => {
        return ele.others.tags
      })

      this.tags.forEach(ele => [
        buffer.push(...ele)
      ])

      this.tagsFiltered = new Set(buffer)
      this.tagsFiltered = Array.from(this.tagsFiltered)
    }).catch(err => {
      console.log(err)
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
  padding: 1rem;
}

.card {
  border-radius: 5px;
}

.card-footer {
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
}

</style>
