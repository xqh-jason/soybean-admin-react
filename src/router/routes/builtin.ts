import type { RouteObject } from 'react-router-dom';

function convert(m: any) {
  const { default: Component } = m;

  return {
    Component
  };
}

/**
 * 基础子路由
 *
 * - 关于为什么复用路由需要直接写成react-router的标准格式
 * - 因为每个路由都有自己的loader,action,shouldRevalidate,都是函数
 * - 在后续的通过菜单管理去动态生成路由的时候，函数的编写问题，安全性，性能，可维护性都是问题
 * - 所以需要直接写成react-router的标准格式
 * - 建议复用路由都通过前端自己手动配置去生成(在实际的开发中，复用路由的情况还是很少的)
 * - 所以开发量其实不会很大，其他的约定式都是自动生成并配置的
 */
export const BaseChildrenRoutes = [] satisfies RouteObject[];
