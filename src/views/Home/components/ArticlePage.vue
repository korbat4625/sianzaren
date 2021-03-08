<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <section class="article">
          <section class="content__header">
            <h3>{{ articleInfo.title }}</h3>
            <p>文章作者: {{ articleInfo.authorInfo.displayName }}</p>
            <p>上傳時間: {{ articleInfo.contentData.createdAt }}</p>
          </section>
          <section class="article__content markdown">
            <div class="markdown-content">
              <div class="markdown-preview markdown-theme-light">
                <div v-html="articleInfo.contentData.html"></div>
              </div>
            </div>
          </section>
          <section
            v-b-toggle.sidebar-discuss
            class="toggler-discuss d-inline-block"
          >
            <img
              style="width: 24px;"
              class="d-inline-block"
              src="@/assets/vector/speech-bubble-message-svgrepo-com.svg"
              alt=""
            >
            {{ comments.length }}
          </section>
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
    <b-sidebar
      id="sidebar-discuss"
      bg-variant="dark"
      text-variant="light"
      title="討論些什麼?"
      right
      shadow
      backdrop
      no-header-close
    >
      <template v-slot:footer="{ hide }">
        <div class="d-flex flex-column text-light px-3 py-2">
          <b-button size="sm" @click="hide">Close</b-button>
        </div>
      </template>
      <section
        border-variant="secondary"
        header="討論板"
        header-border-variant="secondary"
        align="center"
        class="p-3"
      >
        <section class="mb-5" v-for="comment in comments" :key="comment.id">
          <section class="discuss-header text-left">
            {{ comment.who }}:
          </section>
          <section class="discuss-content text-left">
            {{ comment.value }}
          </section>
          <section class="discuss-footer text-left">
            {{ transferTime(comment.createdAt) }}
          </section>
        </section>
        <section v-if="!noComments">乏人問津...</section>
      </section>
    </b-sidebar>
  </b-container>
</template>

<script>
import { db } from '@/Model/FirebaseModel.js'
export default {
  name: 'ArticlePage',
  data () {
    return {
      articleId: this.$route.params.articleId,
      articleInfo: {
        others: {
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
    console.log(this.$route)
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
      const comment = {
        who: this.iAm,
        value: this.commentTextarea,
        createdAt: new Date().getTime()
      }
      const article = {
        id: this.$route.params
      }
      articleRef.add(comment).then(function (commentData) {
        comment.id = commentData.id
        self.comments.push(comment)
      }).catch(err => {
        console.log(err)
      })
      console.log(article)
      this.F_updateArticle(this.articleData, 'update', article)
    },
    transferTime (timeStamp) {
      const y = ('0' + new Date(timeStamp).getFullYear()).substr(-4)
      const m = ('0' + new Date(timeStamp).getMonth()).substr(-2)
      const d = ('0' + new Date(timeStamp).getDate()).substr(-2)
      return y + '-' + m + '-' + d
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
