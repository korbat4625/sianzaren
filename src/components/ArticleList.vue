<template>
  <div class="article__blocks">
    <div class="article__blocks__block" v-for="article in posts" :key="article.id">
      <div class="article__blocks__block_title">
        <h3>{{ article.title }}</h3>
      </div>
      <div class="article__blocks__block_content">
        <p>{{ article.stopOnMore }}</p>
      </div>
      <div class="goto" @click="gotoArticle">
        <p :data-articleId="article.id"> >> 繼續閱讀</p>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../Model/FirebaseModel.js'
export default {
  name: 'ArticleList',
  props: {
    msg: String
  },
  created () {
    const self = this
    db.collection('posts').orderBy('createdAt', 'desc').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())
        const data = doc.data()
        data.id = doc.id
        self.posts.push(data)
        console.log(data)
      })
    })
  },

  data () {
    return {
      posts: [
      ]
    }
  },

  methods: {
    gotoArticle ({ target }) {
      const targetArticle = this.posts.find(ele => {
        return target.dataset.articleid === ele.id
      })
      console.log(targetArticle)
      console.log(this.$route)
      this.$router.push(`/article/${targetArticle.id}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
