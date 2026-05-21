import { LanguageSwitcher } from '@/shared/components/language-switcher';

/**
 * 主应用布局组件
 * 包含导航栏和语言切换器
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* 顶部导航栏 */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="font-semibold">Next.js Base App</div>
          <LanguageSwitcher />
        </div>
      </header>
      
      {/* 主内容区域 */}
      <main>{children}</main>
    </div>
  );
}
