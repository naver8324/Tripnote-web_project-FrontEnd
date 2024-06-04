import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssPurgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    ...(process.env.NODE_ENV === 'production'
      ? [
          postcssPurgecss({
            content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
