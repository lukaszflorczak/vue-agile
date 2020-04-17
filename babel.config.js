module.exports = {
	presets: [[
		'@vue/app',
		{
			useBuiltIns: 'usage',
			targets: {
				browsers: ['>1%', 'last 2 versions'],
				ie: '11'
			}
		}
	]]
}
