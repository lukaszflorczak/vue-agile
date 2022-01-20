<template lang="pug">
main.main
  site-header

  // Examples
  example-1
  example-2
  example-3
  example-4
</template>

<script>
  import SiteHeader from './components/SiteHeader.vue'

  // Examples
  import Example1 from './examples/Example1.vue'
  import Example2 from './examples/Example2.vue'
  import Example3 from './examples/Example3.vue'
  import Example4 from './examples/Example4.vue'

  export default {
    name: 'PlaygroundApp',
    components: {
      SiteHeader,

      Example1,
      Example2,
      Example3,
      Example4
    }
  }
</script>

<style lang="scss" type="text/scss">
  @import './scss/main.scss';
</style>
