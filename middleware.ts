import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/shared/i18n/config';

/**
 * 国际化中间件
 * 用于处理语言检测和路由重定向
 */
export default createMiddleware({
  // 支持的语言列表
  locales: locales,
  
  // 默认语言
  defaultLocale: defaultLocale
});

export const config = {
  // 匹配需要国际化的路径
  matcher: ['/', '/(zh|en)/:path*']
};
