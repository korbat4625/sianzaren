<template>
  <section class="sianzaren-card"
    @click="gotoArticle(article.id)"
    :data-articleId="article.id"
  >
    <section class="sianzaren-card__title d-flex flex-column mb-3">
      <section>
        <strong>{{ article.contentData.title }}</strong>
      </section>
      <section>
        <span class="sub-text">{{ createdAt }}</span>
      </section>
    </section>
    <section class="sianzaren-card__content">
      <section class="sianzaren-card__content__img">
          <!-- <img :src="articleImg" :alt="titleImageDescription"> -->
          <p>{{ article.contentData.stopOnMore }}</p>
      </section>
    </section>
    <section class="sianzaren-card__footer">
      <!-- <section class="author">
        <img :src="authorImg" alt="這是作者的頭像">
      </section> -->
      <section class="tags">
        <label
            class="label-tag"
            :key="tag"
            v-for="tag in article.others.tags"
          >
            {{ tag }}
        </label>
      </section>
      <section
        class="toggler-discuss d-inline-block mb-3"
      >
        <img
          style="width: 24px;"
          class="d-inline-block"
          src="@/assets/vector/speech-bubble-message-svgrepo-com.svg"
          alt=""
        >
        11
      </section>
      <section style="border: solid 1px #ccc;"></section>
    </section>
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
      createdAt: ''
    }
  },
  created () {
    const timeStamp = this.article.contentData.createdAt
    const y = ('0' + new Date(timeStamp).getFullYear()).substr(-4)
    const m = ('0' + new Date(timeStamp).getMonth()).substr(-2)
    const d = ('0' + new Date(timeStamp).getDate()).substr(-2)
    this.createdAt = y + '-' + m + '-' + d
  },
  methods: {
    gotoArticle (articleID) {
      this.$router.push(`/article/${articleID}`)
    }
  }
}
</script>

<style lang="scss">
.sub-text {
  font-size: small;
  color: rgb(221, 221, 221);
}
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

.sianzaren-card {
  padding: 2rem;
  position: relative;
  cursor: pointer;
  transition-duration: .3s;
  // border: solid 4px grey;
  // border-radius: 10px;
  // box-shadow: 0px 2px 2px 1px;
  .sianzaren-card__title {
    font-size: 1.5rem;
  }
  .sianzaren-card__content {
    // margin-bottom: 4rem;
  }
  .sianzaren-card__footer {
  }
  &:hover {
    background-color: #F7F7F7;
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   width: 0;
  //   height: 0;
  //   border-style: solid;
  //   border-width: 30px 40px 0px 0px;
  //   border-color: gray transparent transparent transparent;
  //   bottom: -30px;
  // }
  // &::after {
  //   content: '';
  //   position: absolute;
  //   width: 0;
  //   height: 0;
  //   border-style: solid;
  //   border-width: 22px 28px 0px 0px;
  //   border-color: white transparent transparent transparent;
  //   left: 36px;
  //   bottom: -22px;
  // }
}
</style>
