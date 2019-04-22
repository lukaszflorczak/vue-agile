<template lang="pug">
	footer.site-footer
		div.container
			div.row
				div.col-xs-12
					div.copyright
						span Copyright © 2017-2019 #[strong Łukasz Florczak]!{' '}

						a(href="https://twitter.com/lukaszflorczak" class="twitter-follow-button" data-show-count="false") Follow @lukaszflorczak
						a(href="http://ko-fi.com/lukaszflorczak" target="_blank")
							img(src="https://img.shields.io/badge/buy%20me%20a%20coffee-+3€-red.svg?style=flat&logo=ko-fi")

			div.row
				div.col-xs-12
					div.license Licensed under the MIT license

</template>

<script>
	export default {
		name: 'SiteFooter'
	}
</script>
