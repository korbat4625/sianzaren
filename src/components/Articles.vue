<template>
  <div class="article__blocks">
    <div class="article__blocks__block" v-for="article in posts" :key="article.id">
      <div class="article__blocks__block_title">
        <h3>{{ article.title }}</h3>
      </div>
      <div class="article__blocks__block_content">
        <p>{{ article.content }}</p>
      </div>
      <div class="goto">
        <p>>> 繼續閱讀</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    msg: String
  },
  data () {
    return {
      posts: [
        {
          title: '鐵人賽第一天',
          content: '第一天就不知道怎麼辦，還有29天也...',
          id: 12
        }, {
          title: '鐵人賽第一天',
          content: '第一天就不知道怎麼辦，還有29天也...',
          id: 12
        }, {
          title: '鐵人賽第一天',
          content: '第一天就不知道怎麼辦，還有29天也...',
          id: 12
        }, {
          title: '鐵人賽第一天',
          content: '第一天就不知道怎麼辦，還有29天也...',
          id: 12
        }, {
          title: '鐵人賽第一天',
          content: '第一天就不知道怎麼辦，還有29天也...',
          id: 12
        }, {
          title: '鐵人賽第一天',
          content: '第一天就不知道怎麼辦，還有29天也...',
          id: 12
        }, {
          title: '鐵人賽第一天',
          content: '第一天就不知道怎麼辦，還有29天也...',
          id: 12
        }, {
          title: '鐵人賽第一天',
          content: '第一天就不知道怎麼辦，還有29天也...',
          id: 12
        }
      ]
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
