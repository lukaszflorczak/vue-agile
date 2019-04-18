<template lang="pug">
	main.main
		site-header

		// Examples
		example-1

		site-footer

</template>

<script>
	import SiteHeader from './components/SiteHeader'
	import SiteFooter from './components/SiteFooter'

	// Examples
	import Example1 from './examples/Example1'

	export default {
		name: 'Demo',

		components: {
			SiteHeader,
			SiteFooter,

			Example1
		}
	}
</script>

<style lang="scss" type="text/scss">
	@import './scss/main.scss';
</style>
