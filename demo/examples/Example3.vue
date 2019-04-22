<template lang="pug">
	section.section.section--demo-3
		div.container
			div.row
				div.col-xs-12
					h2.section__title #[strong #3] demo
						code-pen(id="xezgmO")
					p.section__description vue-agile with autoplay and fade effect

			div.row
				div.col-xs-12
					agile(:nav-buttons="false" :autoplay-speed="5000" :speed="2500" fade pause-on-hover pause-on-dots-hover autoplay)
						img.slide(src='https://images.unsplash.com/photo-1509549649946-f1b6276d4f35?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ')
						img.slide(src='https://images.unsplash.com/photo-1511469054436-c7dedf24c66b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9')
						img.slide(src='https://images.unsplash.com/photo-1511135232973-c3ee80040060?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9')
						img.slide(src='https://images.unsplash.com/photo-1511231683436-44735d14c11c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9')
						img.slide(src='https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9')


</template>


<script>
	export default {
		name: 'Example3'
	}
</script>

<style lang="sass">
	.section--demo-3
		.agile
			&__dots
				bottom: 10px
				flex-direction: column
				right: 30px
				position: absolute

			&__dot
				margin: 5px 0

				button
					background-color: transparent
					border: 1px solid #fff
					cursor: pointer
					display: block
					height: 10px
					font-size: 0
					line-height: 0
					margin: 0
					padding: 0
					transition-duration: .3s
					width: 10px

				&--current,
				&:hover
					button
						background-color: #fff

		// Slides styles
		.slide
			display: block
			height: 500px
			object-fit: cover
			width: 100%
</style>