<template lang="pug">
div.codepen(v-if="id")
  a(:href="`https://codepen.io/lukaszflorczak/pen/${id}`" target="_blank")
    span Edit on
    span
      | C
      i.fab.fa-codepen
      | dePen

</template>

<script>
  export default {
    name: 'CodePen',

    props: {
      id: {
        type: String,
        default: null
      }
    }
  }
</script>
