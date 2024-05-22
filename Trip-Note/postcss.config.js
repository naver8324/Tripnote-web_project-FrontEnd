module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.html', './src/**/*.js'],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
