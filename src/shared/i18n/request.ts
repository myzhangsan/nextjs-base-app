import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

/**
 * next-intl 请求配置
 * 根据当前语言加载对应的翻译文件
 */
export default getRequestConfig(async ({ locale }) => {
  // 验证语言是否支持
  if (!locales.includes(locale as any)) notFound();

  return {
    locale: locale!,
    messages: (await import(`../../../messages/${locale}.json`)).default
  };
});
