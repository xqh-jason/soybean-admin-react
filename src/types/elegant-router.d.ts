/* prettier-ignore */
/* eslint-disable */
// Generated by elegant-router
// Read more: https://github.com/mufeng889/elegant-router
// Vue auto route: https://github.com/soybeanjs/elegant-router
// 请不要手动修改此文件，否则会导致优雅路由无法正常工作
// 如果需要修改，请在优雅路由配置文件中进行修改
// 这是自动生成的文件，请不要手动修改

import '@soybean-react/vite-plugin-react-router';

declare module "@soybean-react/vite-plugin-react-router" {

  /**
   * route map
   */
  export type RouteMap = {
    "not-found": "*";
    "exception": "/exception";
    "exception_403": "/exception/403";
    "exception_404": "/exception/404";
    "exception_500": "/exception/500";
    "(base)_home": "/home";
    "(base)_label-manage": "/label-manage";
    "(base)_label-manage_product-labels": "/label-manage/product-labels";
    "(base)_shein-listing": "/shein-listing";
    "(base)_shein-listing_full-care-mode": "/shein-listing/full-care-mode";
    "(base)_user-center": "/user-center";
    "(blank)_login": "/login";
    "(blank)_login_code-login": "/login/code-login";
    "(blank)_login_register": "/login/register";
    "(blank)_login_reset-pwd": "/login/reset-pwd";
    "(blank)_login-out": "/login-out";
    "403": "/403";
    "404": "/404";
    "500": "/500";
    "iframe-page": "/iframe-page";
    "root": "/";
  };

  /**
   * route key
   */
  export type RouteKey = keyof RouteMap;

  /**
   * route path
   */
  export type RoutePath = RouteMap[RouteKey];

  /**
   * custom route key
   */
  export type CustomRouteKey = Extract<
    RouteKey,
    | "not-found"
    | "exception"
    | "exception_403"
    | "exception_404"
    | "exception_500"
  >;

  /**
   * the generated route key
   */
  export type GeneratedRouteKey = Exclude<RouteKey, CustomRouteKey>;

  /**
   * the first level route key, which contain the layout of the route
   */
  export type FirstLevelRouteKey = Extract<
    RouteKey,
    | "(base)"
    | "(blank)"
    | "403"
    | "404"
    | "500"
    | "iframe-page"
    | "root"
  >;

  /**
   * the custom first level route key
   */
  export type CustomFirstLevelRouteKey = Extract<
    CustomRouteKey,
    | "not-found"
    | "exception"
  >;

  /**
   * the last level route key, which has the page file
   */
  export type LastLevelRouteKey = Extract<
    RouteKey,
    | "(base)_home"
    | "(base)_label-manage"
    | "(base)_label-manage_product-labels"
    | "(base)"
    | "(base)_shein-listing_full-care-mode"
    | "(base)_shein-listing"
    | "(base)_user-center"
    | "(blank)"
    | "(blank)_login-out"
    | "(blank)_login_code-login"
    | "(blank)_login"
    | "(blank)_login"
    | "(blank)_login_register"
    | "(blank)_login_reset-pwd"
    | "403"
    | "404"
    | "500"
    | "iframe-page"
    | "root"
    | "root"
    | "root"
    | "root"
  >;

  /**
   * the custom last level route key
   */
  export type CustomLastLevelRouteKey = Extract<
    CustomRouteKey,
    | "not-found"
    | "exception_403"
    | "exception_404"
    | "exception_500"
  >;
}
