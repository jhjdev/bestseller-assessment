module.exports = [
  {
    ignores: [
      'dist/**',
      '.output/**', 
      '.nuxt/**',
      'node_modules/**',
      'coverage/**',
      '*.min.js'
    ]
  },
  {
    files: ['**/*.js', '**/*.ts'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error'
    }
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  },
  {
    files: ['server/**/*'],
    rules: {
      'no-console': 'off'
    }
  }
];
