<template lang="pug">
	main.main
		site-header

		// Examples
		example-1
		example-2
		example-3
		example-4

		site-footer

</template>

<script>
	import SiteHeader from './components/SiteHeader'
	import SiteFooter from './components/SiteFooter'

	// Examples
	import Example1 from './examples/Example1'
	import Example2 from './examples/Example2'
	import Example3 from './examples/Example3'
	import Example4 from './examples/Example4'

	export default {
		name: 'Demo',

		components: {
			SiteHeader,
			SiteFooter,

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
