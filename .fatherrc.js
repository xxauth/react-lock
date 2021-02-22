import commonjs from 'rollup-plugin-commonjs';

// 通用的配置，可以在每个package里写 fatherrc.js 来覆盖
export default {
  cjs: 'rollup',
  esm: 'rollup',
  lessInBabelMode: true,
  extractCSS: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
  ],
  extraRollupPlugins: [
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};
