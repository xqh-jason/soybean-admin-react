/* prettier-ignore */
/* eslint-disable */
// Generated by elegant-router
// Read more: https://github.com/mufeng889/elegant-router
// Vue auto route: https://github.com/soybeanjs/elegant-router
// 请不要手动修改此文件，否则会导致优雅路由无法正常工作
// 如果需要修改，请在优雅路由配置文件中进行修改
// 这是自动生成的文件，请不要手动修改

//这里只能修改 handle 并且路由组作为布局路由组件 是不能有handle的

import type { ElegantConstRoute } from '@soybean-react/vite-plugin-react-router';

export const generatedRoutes: ElegantConstRoute[] = [
  {
    matchedFiles: ['root', '/src/pages/index.tsx', '/src/pages/loading.tsx', 'root'],
    name: 'root',
    path: '/',
    handle: { i18nKey: 'route.root', title: 'root', constant: true },
    children: [
      {
        matchedFiles: ['(base)', null, null, null],
        name: '(base)',
        children: [
          {
            matchedFiles: [null, '/src/pages/(base)/home/index.tsx', null, null],
            name: '(base)_home',
            path: '/home',
            handle: { i18nKey: 'route.(base)_home', icon: 'mdi:monitor-dashboard', order: 1, title: 'home' }
          },
          {
            matchedFiles: [null, '/src/pages/(base)/manage/index.tsx', null, null],
            name: '(base)_manage',
            path: '/manage',
            handle: {
              i18nKey: 'route.(base)_manage',
              icon: 'carbon:cloud-service-management',
              order: 8,
              title: 'manage'
            },
            children: [
              {
                matchedFiles: [null, '/src/pages/(base)/manage/role/index.tsx', null, null],
                name: '(base)_manage_role',
                path: '/manage/role',
                handle: {
                  i18nKey: 'route.(base)_manage_role',
                  icon: 'carbon:user-role',
                  order: 2,
                  title: 'manage_role'
                },
                children: [
                  {
                    matchedFiles: [null, '/src/pages/(base)/manage/role/[...slug].tsx', null, null],
                    name: '(base)_manage_role_[...slug]',
                    path: '/manage/role/*',
                    handle: {
                      i18nKey: 'route.(base)_manage_role_[...slug]',
                      hideInMenu: true,
                      title: '(base)_manage_role_[...slug]'
                    }
                  }
                ]
              }
            ]
          }
        ],
        path: null
      },
      {
        matchedFiles: ['(blank)', null, null, null],
        name: '(blank)',
        children: [
          {
            matchedFiles: ['(blank)_login', '/src/pages/(blank)/login/index.tsx', null, null],
            name: '(blank)_login',
            path: '/login',
            handle: { i18nKey: 'route.(blank)_login', title: '(blank)_login', constant: true },
            children: [
              {
                matchedFiles: [null, '/src/pages/(blank)/login/code-login/index.tsx', null, null],
                name: '(blank)_login_code-login',
                path: '/login/code-login',
                handle: { i18nKey: 'route.(blank)_login_code-login', title: '(blank)_login_code-login', constant: true }
              },
              {
                matchedFiles: [null, '/src/pages/(blank)/login/register/index.tsx', null, null],
                name: '(blank)_login_register',
                path: '/login/register',
                handle: { i18nKey: 'route.(blank)_login_register', title: '(blank)_login_register', constant: true }
              },
              {
                matchedFiles: [null, '/src/pages/(blank)/login/reset-pwd/index.tsx', null, null],
                name: '(blank)_login_reset-pwd',
                path: '/login/reset-pwd',
                handle: { i18nKey: 'route.(blank)_login_reset-pwd', title: '(blank)_login_reset-pwd', constant: true }
              }
            ]
          },
          {
            matchedFiles: [null, '/src/pages/(blank)/login-out/index.tsx', null, null],
            name: '(blank)_login-out',
            path: '/login-out',
            handle: { i18nKey: 'route.(blank)_login-out', title: '(blank)_login-out', constant: true }
          }
        ],
        path: null
      },
      {
        matchedFiles: [null, '/src/pages/_builtin/403/index.tsx', null, null],
        name: '403',
        path: '/403',
        handle: { i18nKey: 'route.403', title: '403', constant: true }
      },
      {
        matchedFiles: [null, '/src/pages/_builtin/404/index.tsx', null, null],
        name: '404',
        path: '/404',
        handle: { i18nKey: 'route.404', title: '404', constant: true }
      },
      {
        matchedFiles: [null, '/src/pages/_builtin/500/index.tsx', null, null],
        name: '500',
        path: '/500',
        handle: { i18nKey: 'route.500', title: '500', constant: true }
      },
      {
        matchedFiles: [null, '/src/pages/_builtin/iframe-page/index.tsx', null, null],
        name: 'iframe-page',
        path: '/iframe-page',
        handle: { i18nKey: 'route.iframe-page', title: 'iframe-page', constant: true }
      },
      {
        matchedFiles: [null, '/src/pages/_builtin/404/index.tsx', null, null],
        name: 'notFound',
        path: '*',
        handle: { i18nKey: 'route.notFound', title: 'notFound', constant: true }
      }
    ]
  }
];
