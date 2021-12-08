<template lang="pug">
header.section.section--header
  div.container
    div.row
      div.col-xs-12
        h1.section__title Demo of #[strong vue-agile]#[span.badge 2.0]

        p vue-agile is a carousel component for Vue.js inspired by Slick. Simple, touch-friendly, written in Vue and Vanilla JS

        .gh-buttons.visible-md
          a.github-button(href="https://github.com/lukaszflorczak/vue-agile" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star lukaszflorczak/vue-agile on GitHub") Star

          a.github-button(href="https://github.com/lukaszflorczak/vue-agile/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch lukaszflorczak/vue-agile on GitHub") Watch

          a.github-button(href="https://github.com/lukaszflorczak/vue-agile/issues" data-icon="octicon-issue-opened" data-size="large" data-show-count="true" aria-label="Issue lukaszflorczak/vue-agile on GitHub") Issue

      div.col-xs-12.hidden-md.gh-buttons
        a.github-button(href="https://github.com/lukaszflorczak/vue-agile" data-icon="octicon-star" data-size="large" data-show-count="false" aria-label="Star lukaszflorczak/vue-agile on GitHub") Star

        a.github-button(href="https://github.com/lukaszflorczak/vue-agile/subscription" data-icon="octicon-eye" data-size="large" data-show-count="false" aria-label="Watch lukaszflorczak/vue-agile on GitHub") Watch

        a.github-button(href="https://github.com/lukaszflorczak/vue-agile/issues" data-icon="octicon-issue-opened" data-size="large" data-show-count="false" aria-label="Issue lukaszflorczak/vue-agile on GitHub") Issue

</template>

<script>
  export default {
    name: 'SiteFooter'
  }
</script>
