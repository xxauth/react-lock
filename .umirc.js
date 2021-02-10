import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'AuthLock',
  favicon: 'http://www.foo.com',
  logo: 'http://www.foo.com',
  navs: [
    null,
    {
      title: 'FormRender',
      path: 'https://x-render.gitee.io/form-render/',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/newtalentxp/module-editor',
    },
    {
      title: '更新日志',
      path:
        'https://github.com/newtalentxp/module-editor/blob/master/CHANGELOG.md',
    },
  ],
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/xauth-lock/',
  publicPath: '/xauth-lock/',
  exportStatic: {},
  // more config: https://d.umijs.org/config
});
