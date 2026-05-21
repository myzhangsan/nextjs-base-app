"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { locales, getLocaleName, type Locale } from '@/shared/i18n/config';

/**
 * 语言切换器组件
 * 允许用户在不同语言之间切换
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * 切换语言
   * @param newLocale 新的语言代码
   */
  const handleLanguageChange = (newLocale: Locale) => {
    // 获取当前路径（去除语言前缀）
    const currentPath = pathname.replace(/^\/(zh|en)/, '') || '/';
    
    // 重定向到新语言的相同路径
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <Button
          key={loc}
          variant={locale === loc ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleLanguageChange(loc)}
          className="min-w-[60px]"
        >
          {getLocaleName(loc)}
        </Button>
      ))}
    </div>
  );
}
