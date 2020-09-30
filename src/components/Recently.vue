<template>
  <div class="recentlyArticle">
    <!-- <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="info">Accordion 1</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-list-group>
          <b-list-group-item
            button
            v-for="post in posts"
            :key="post.id"
            @click="putArticle(post)"
          >
            {{ post.title }}
          </b-list-group-item>
        </b-list-group>
      </b-collapse>
    </b-card> -->
  </div>
</template>

<script>
export default {
  name: 'Recently',
  data () {
    return {
      // posts: []
    }
  }
}
</script>

<style lang="scss">
  .recentlyArticle {
    border: solid 1px #444;
    border-radius: 5px;
    padding: 2rem;
    margin-top: 4rem;
    .recentlyArticle__content {
      height: 600px;
    }
  }
</style>
