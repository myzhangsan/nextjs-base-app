import { routes } from "./routes";

/**
 * 菜单配置
 * 注意：实际使用时应通过国际化翻译获取标题
 */
export const menus = [
  {
    title: "home",
    path: routes.dashboard,
  },
  {
    title: "users",
    path: routes.users,
  },
];
