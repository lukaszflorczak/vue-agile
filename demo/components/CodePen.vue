<template lang="pug">
	div.codepen(data-height="504" data-theme-id="dark" data-default-tab="js,result" data-user="lukaszflorczak" data-slug-hash="EJRNMM" style="height: 504px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="vue-agile – default settings and minimal styles")
	<span>See the Pen <a href="https://codepen.io/lukaszflorczak/pen/EJRNMM/">
	vue-agile – default settings and minimal styles</a> by Lukasz Florczak (<a href="https://codepen.io/lukaszflorczak">@lukaszflorczak</a>)
	on <a href="https://codepen.io">CodePen</a>.</span>
	</p>
	<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</template>

<script>
	export default {
		name: 'CodePen',

		props: {
			id: {
				type: String,
				default: null
			},

			height: {
				type: Integer,
				default: 400
			}
		}
	}
</script>
