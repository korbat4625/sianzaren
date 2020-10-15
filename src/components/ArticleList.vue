<template>
  <div class="article__blocks">

    <ArticleCard
      v-for="article in filterPosts"
      :article="article"
      :key="article.id"
      article-img="https://placekitten.com/380/200"
      titleImageDescription="a ate"
      author-img=""
    >
    </ArticleCard>
    <!-- <b-card
      no-body
      style="max-width: 20rem;"
      img-src="https://placekitten.com/380/200"
      img-alt="Image"
      img-top
      v-for="article in filterPosts"
      :key="article.id"
    >
      <b-card-body>
        <b-card-title>{{ article.contentData.title }}</b-card-title>
        <b-card-text>
          {{ article.contentData.stopOnMore }}
        </b-card-text>
      </b-card-body>
      <b-card-footer>
        <div class="tags">
          <label
            class="label-tag"
            :key="tag"
            v-for="tag in article.aboutCategory.tags"
          >
            {{ tag }}
          </label>
        </div>
        <span class="goto" @click="gotoArticle(article.id)"  :data-articleId="article.id">繼續閱讀</span>
      </b-card-footer>
    </b-card> -->
    <div class="article__tags--expose" v-show="false">
      <slot name="tagsFiltered" :tagsFiltered="tagsFiltered"></slot>
    </div>
  </div>
</template>

<script>
import firebase from '../Model/FirebaseModel.vue'
import ArticleCard from './ArticleCard'
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
  column-gap: 5px;
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

  .goto {
    margin: 5px;
  }
}

</style>
