import commonjs from 'rollup-plugin-commonjs';

export default {
  esm: 'rollup',
  cjs: 'rollup',
  lessInBabelMode: true,
  extractCSS: true,
  extraRollupPlugins: [
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};
