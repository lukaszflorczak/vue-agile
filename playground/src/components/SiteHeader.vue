<template lang="pug">
header.section.section--header
  div.container
    div.row
      div.col-xs-12
        h1.section__title Demo of #[strong vue-agile-lite]#[span.badge 1.0]

        p This is a customized version of
          |
          a(href="https://github.com/lukaszflorczak/vue-agile" target="_blank") vue-agile
          |  with smaller bundle size and better performance.

        .gh-buttons.visible-md
          a.github-button(href="https://github.com/FrontLabsOfficial/vue-agile" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star lukaszflorczak/vue-agile on GitHub") Star

          a.github-button(href="https://github.com/FrontLabsOfficial/vue-agile/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch lukaszflorczak/vue-agile on GitHub") Watch

          a.github-button(href="https://github.com/FrontLabsOfficial/vue-agile/issues" data-icon="octicon-issue-opened" data-size="large" data-show-count="true" aria-label="Issue lukaszflorczak/vue-agile on GitHub") Issue

      div.col-xs-12.hidden-md.gh-buttons
        a.github-button(href="https://github.com/FrontLabsOfficial/vue-agile/vue-agile" data-icon="octicon-star" data-size="large" data-show-count="false" aria-label="Star lukaszflorczak/vue-agile on GitHub") Star

        a.github-button(href="https://github.com/FrontLabsOfficial/vue-agile/subscription" data-icon="octicon-eye" data-size="large" data-show-count="false" aria-label="Watch lukaszflorczak/vue-agile on GitHub") Watch

        a.github-button(href="https://github.com/FrontLabsOfficial/vue-agile/issues" data-icon="octicon-issue-opened" data-size="large" data-show-count="false" aria-label="Issue lukaszflorczak/vue-agile on GitHub") Issue

</template>

<script>
  export default {
    name: 'SiteHeader'
  }
</script>
