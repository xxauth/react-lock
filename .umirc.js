import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'AuthLock',
  favicon: 'http://www.foo.com',
  logo: 'http://www.foo.com',
  navs: [
    null,
    {
      title: 'AuthLock',
      path: 'https://github.com./xxauth/react-lock',
    },
    {
      title: 'GitHub',
      path: 'https://github.com./xxauth/react-lock',
    },
    {
      title: '更新日志',
      path: 'https://github.com./xxauth/react-lock/blob/master/CHANGELOG.md',
    },
  ],
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/xauth-lock/',
  publicPath: '/xauth-lock/',
  exportStatic: {},
  // more config: https://d.umijs.org/config
});
