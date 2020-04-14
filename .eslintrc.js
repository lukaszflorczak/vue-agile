module.exports = {
    root: true,

    env: {
		node: true
	},

    plugins: ['pug'],

    'extends': [
		'plugin:vue/recommended'
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
			'attribute': 1,
			'baseIndent': 1,
			'closeBracket': 0,
			'alignAttributesVertically': true,
			'ignores': []
		}],
		'vue/component-name-in-template-casing': 'error',
		// single quotes
		'quotes': [2, 'single'],
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0
	},

    parserOptions: {
		parser: 'babel-eslint'
	},

    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ]
}
