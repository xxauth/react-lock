import commonjs from 'rollup-plugin-commonjs';

// 通用的配置，可以在每个package里写 fatherrc.js 来覆盖
export default {
  cjs: 'rollup',
  esm: 'rollup',
  lessInBabelMode: true,
  extractCSS: true,
  extraRollupPlugins: [
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};
