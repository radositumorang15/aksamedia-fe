import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import postcssNested from 'postcss-nested';

export default {
  plugins: [
    postcssImport,
    autoprefixer,
    tailwindcss,
    postcssNested
  ]
};
