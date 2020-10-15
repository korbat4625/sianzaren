<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <div class="article">
          <div class="content__header">
            <h3>{{ articleInfo.title }}</h3>
            <p>文章作者: {{ articleInfo.authorInfo.displayName }}</p>
            <p>上傳時間: {{ articleInfo.contentData.createdAt }}</p>
          </div>
          <div class="article__content" v-html="articleInfo.contentData.html"></div>
        </div>
      </b-col>

      <b-col md="12">
        <section
            border-variant="secondary"
            header="討論板"
            header-border-variant="secondary"
            align="center"
          >
          <div v-for="comment in comments" :key="comment.id">{{ comment.who }} : {{ comment.value }}</div>
          <div v-if="!noComments">看起來目前乏人問津呢...</div>
        </section>
      </b-col>

      <b-col md="5">
        <section border-variant="info" header="我想說話..." align="center">
          <div>
            <b-form-input v-model="iAm" placeholder="我叫做..." autocomplete="off"></b-form-input>
          </div>
          <b-form-textarea
            autocomplete="off"
            id="textarea"
            v-model="commentTextarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
            class="mt-2"
          ></b-form-textarea>
          <b-button variant="light" class="mt-2" @click="leaveAMessage(commentTextarea)">留言</b-button>
        </section>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db } from '../Model/FirebaseModel.js'
export default {
  name: 'ArticlePage',
  data () {
    return {
      articleId: this.$route.params.articleId,
      articleInfo: {
        aboutCategory: {
          tags: []
        },
        authorInfo: {
          displayName: '',
          email: '',
          uid: '',
          photoURL: ''
        },
        contentData: {
          title: '',
          createdAt: '',
          stopOnMore: '',
          value: '',
          html: ''
        }
      },

      comments: [],
      iAm: '',
      commentTextarea: ''
    }
  },
  computed: {
    noComments () {
      return this.comments.length
    }
  },
  created () {
    const self = this
    const articleRef = db.collection('posts').doc(this.articleId)
    articleRef.get().then((doc) => {
      if (doc.exists) {
        this.articleInfo = doc.data()
      } else {
        console.log('No such document!')
      }
    }).catch(function (error) {
      console.log('Error getting document:', error)
    })

    db.collection('posts').doc(this.articleId).collection('comments').orderBy('createdAt', 'desc')
      .get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data(), ' => ', self.comments)
          self.comments.push(doc.data())
        })
      })
  },

  methods: {
    leaveAMessage () {
      const self = this
      const articleRef = db.collection('posts').doc(this.articleId).collection('comments')
      const d = new Date()

      let month = (d.getMonth() + 1)
      let date = d.getDate()
      let hours = d.getHours()
      let minutes = d.getMinutes()
      let seconds = d.getSeconds()
      if (String(date).length === 1) date = '0' + String(date)
      if (String(month).length === 1) month = '0' + String(month)
      if (hours === 0) hours = '00'
      if (String(hours).length === 1 === 0) hours = '0' + String(hours)
      if (String(minutes).length === 1) minutes = '0' + String(minutes)
      if (String(seconds).length === 1) seconds = '0' + String(seconds)
      const time = d.getFullYear() + '-' + month + '-' + date + '^^' + hours + ' : ' + minutes + ' : ' + seconds
      const comment = {
        who: this.iAm,
        value: this.commentTextarea + '-----' + time,
        createdAt: new Date().getTime()
      }

      articleRef.add(comment).then(function (commentData) {
        comment.id = commentData.id
        self.comments.replace(comment)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scope>
.container-fluid {
  padding: 3rem;

  .card {
    margin-top: 2rem
  }
}
</style>
