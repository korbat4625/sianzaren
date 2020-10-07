<template>
  <b-container class="pageHome">
    <b-row>
      <b-col cols="9">
        <ArticleList
          :chooseTag="storeChooseTags"
        >
          <template v-slot:tagsFiltered="{tagsFiltered: tags}">
            {{ getChildValue(tags) }}
          </template>
        </ArticleList>
      </b-col>
      <b-col cols="3">
        <Recently
          :tags="storeAllTags"
        >
          <template v-slot:chooseTagDispose="{chooseTagDispose: tag}">
            {{ getChildSelectTag(tag) }}
          </template>
        </Recently>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import ArticleList from '@/components/ArticleList.vue'
import Recently from '@/components/Recently.vue'

export default {
  name: 'Home',
  data () {
    return {
      storeAllTags: [],
      storeChooseTags: null
    }
  },
  components: {
    ArticleList,
    Recently
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

<style lang="scss" scoped>
</style>
