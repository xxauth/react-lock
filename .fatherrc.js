import commonjs from 'rollup-plugin-commonjs';

// 通用的配置，可以在每个package里写 fatherrc.js 来覆盖
export default {
  cjs: {
    type: 'rollup',
    minify: true,
  },
  esm: {
    type: 'rollup',
    minify: false,
  },
  lessInBabelMode: true,
  extractCSS: true,
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  extraRollupPlugins: [
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};
