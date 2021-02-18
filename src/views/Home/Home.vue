<template>
  <b-container fluid class="pageHome">
    <b-row>
      <b-col lg="2" cols="0">
      </b-col>
      <b-col lg="8" cols="12">
        <ArticleList
          :chooseTag="storeChooseTags"
        >
          <template v-slot:tagsFiltered="{tagsFiltered: tags}">
            {{ getChildValue(tags) }}
          </template>
        </ArticleList>
      </b-col>
      <b-col lg="2" cols="0">
        <!-- <Recently
          :tags="storeAllTags"
        >
          <template v-slot:chooseTagDispose="{chooseTagDispose: tag}">
            {{ getChildSelectTag(tag) }}
          </template>
        </Recently> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import ArticleList from '@/components/ArticleList.vue'
// import Recently from '@/components/Recently.vue'

export default {
  name: 'Home',
  data () {
    return {
      storeAllTags: [],
      storeChooseTags: null
    }
  },
  components: {
    ArticleList
    // Recently
  },
  methods: {
    getChildValue (value) {
      this.storeAllTags = value
    },

    getChildSelectTag (tag) {
      this.storeChooseTags = tag
    }
  }
}
</script>

<style lang="scss">
.pageHome {
  padding-top: 3rem;
  // background-color: #4E4B4C;
}

.toggler-discuss {
    border-radius: 20px;
    padding: 5px;
    transition-duration: .2s;
    outline: 0;
    &:hover {
      background-color: rgba(233, 233, 233, 0.664);
    }
  }
</style>
