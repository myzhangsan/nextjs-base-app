export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh';

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English'
};

/**
 * 获取语言名称
 * @param locale 语言代码
 * @returns 语言显示名称
 */
export function getLocaleName(locale: Locale): string {
  return localeNames[locale];
}
