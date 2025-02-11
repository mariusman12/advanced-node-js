import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config} */
export default [
	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'commonjs', // ✅ Setează CommonJS
			ecmaVersion: 'latest',
			globals: globals.node, // ✅ Setează variabile globale pentru Node.js
		},
		rules: {
			semi: ['error', 'always'],
			quotes: ['error', 'double'],
			'no-unused-vars': 'warn',
			'no-console': 'off',
			'no-undef': 'off', // ✅ Dezactivează verificarea 'require' și 'module'
		},
	},
	pluginJs.configs.recommended,
];
