module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/essential',
		'@vue/standard'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-multiple-empty-lines': [2, { 'max': 2, 'maxEOF': 1 }],
		'no-tabs': 0,
		// 'indent': [2, 'tab'],
		'indent': 'off',
		'vue/script-indent': ['error', 'tab', {
			'baseIndent': 1,
			'switchCase': 1
		}],
		'vue/html-indent': ['error', 'tab', {
			'attribute': 0,
			'baseIndent': 1,
			'closeBracket': 0,
			'alignAttributesVertically': false,
			'ignores': []
		}],
		// single quotes
		'quotes': [2, 'single'],
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		'vue/order-in-components': ['error']
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
