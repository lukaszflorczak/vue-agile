module.exports = {
	env: {
		node: true,
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'prettier'
	],
	rules: {
		'vue/multi-word-component-names': ['error', {
			'ignores': ['Agile']
		}]
	},
}
