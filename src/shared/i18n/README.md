# 国际化 (i18n) 使用指南

本项目使用 `next-intl` 实现多语言支持，当前支持中文 (zh) 和英文 (en)。

## 目录结构

```
nextjs-base-app/
├── messages/                  # 翻译文件目录
│   ├── zh.json               # 中文翻译
│   └── en.json               # 英文翻译
├── next.config.ts             # Next.js 配置（含 next-intl 插件）
├── middleware.ts              # 国际化中间件
└── src/
    └── shared/
        └── i18n/
            ├── config.ts      # 国际化配置（语言列表等）
            ├── request.ts     # next-intl 请求配置
            └── README.md      # 本文档
```

## 配置说明

### 1. 支持的语言

在 `src/shared/i18n/config.ts` 中定义：

```typescript
export const locales = ['zh', 'en'] as const;
export const defaultLocale: Locale = 'zh';
```

### 2. 翻译文件

翻译文件位于 `messages/` 目录，采用 JSON 格式：

```json
{
  "common": {
    "appName": "Next.js 基础应用",
    "login": "登录"
  },
  "auth": {
    "loginTitle": "登录",
    "emailLabel": "邮箱"
  }
}
```

### 3. 路由结构

国际化启用后，URL 将包含语言前缀：
- `/zh/login` - 中文登录页
- `/en/login` - 英文登录页

## 使用方法

### 在组件中使用翻译

#### 1. Client Components（客户端组件）

```tsx
"use client";

import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('auth');
  
  return (
    <div>
      <h1>{t('loginTitle')}</h1>
      <label>{t('emailLabel')}</label>
    </div>
  );
}
```

#### 2. Server Components（服务端组件）

```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyPage() {
  const t = await getTranslations('dashboard');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### 获取当前语言

```tsx
import { useLocale } from 'next-intl';

export function LanguageDisplay() {
  const locale = useLocale();
  
  return <div>当前语言: {locale}</div>;
}
```

### 语言切换

项目中已提供 `LanguageSwitcher` 组件：

```tsx
import { LanguageSwitcher } from '@/shared/components/language-switcher';

export function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

## 添加新语言

### 1. 更新配置

在 `src/shared/i18n/config.ts` 中添加新语言：

```typescript
export const locales = ['zh', 'en', 'ja'] as const;

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語'
};
```

### 2. 创建翻译文件

创建 `messages/ja.json` 文件并添加翻译内容。

### 3. 更新中间件

确保 `middleware.ts` 中的 matcher 包含新语言：

```typescript
export const config = {
  matcher: ['/', '/(zh|en|ja)/:path*']
};
```

## 添加新的翻译键

### 1. 在翻译文件中添加

**messages/zh.json:**
```json
{
  "newSection": {
    "title": "新标题",
    "description": "新描述"
  }
}
```

**messages/en.json:**
```json
{
  "newSection": {
    "title": "New Title",
    "description": "New Description"
  }
}
```

### 2. 在组件中使用

```tsx
const t = useTranslations('newSection');

return (
  <div>
    <h1>{t('title')}</h1>
    <p>{t('description')}</p>
  </div>
);
```

## 最佳实践

### 1. 命名空间组织

按功能模块组织翻译键：
- `common` - 通用文本
- `auth` - 认证相关
- `dashboard` - 仪表板相关
- `users` - 用户管理相关

### 2. 避免硬编码文本

❌ **不推荐：**
```tsx
<h1>登录</h1>
```

✅ **推荐：**
```tsx
<h1>{t('loginTitle')}</h1>
```

### 3. 保持翻译文件同步

添加新功能时，确保所有语言的翻译文件都包含相应的键值。

### 4. 使用描述性的键名

❌ **不推荐：**
```json
{
  "text1": "登录",
  "text2": "注册"
}
```

✅ **推荐：**
```json
{
  "loginTitle": "登录",
  "registerButton": "注册"
}
```

## 常见问题

### Q: 如何在不改变 URL 的情况下检测用户语言？

A: next-intl 会自动检测浏览器语言偏好，并在首次访问时重定向到合适的语言版本。

### Q: 如何处理缺失的翻译？

A: next-intl 会回退到默认语言（中文）。确保所有翻译文件保持同步。

### Q: 如何在 API 路由中使用国际化？

A: 可以使用 `getRequestConfig` 或在 API 路由中手动加载翻译文件。

## 更多资源

- [next-intl 官方文档](https://next-intl.dev/)
- [Next.js 国际化指南](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

---

## 常见问题与故障排除

### 问题 1: Couldn't find next-intl config file

**症状**: 
```
Runtime Error
Couldn't find next-intl config file.
```

**原因**: 
- `next.config.ts` 中未正确配置 next-intl 插件路径
- 或 `request.ts` 文件不存在于指定位置

**解决方案**:
1. 确认 `next.config.ts` 存在并包含：
   ```typescript
   import createNextIntlPlugin from 'next-intl/plugin';
   const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');
   export default withNextIntl(nextConfig);
   ```
2. 确认 `src/shared/i18n/request.ts` 文件存在
3. 停止服务器（Ctrl + C）
4. 删除 `.next` 目录：`Remove-Item -Recurse -Force .next`
5. 重新启动服务器：`pnpm dev`

**预防措施**:
- 确保 `next.config.ts` 在项目根目录
- 确保 `request.ts` 在 `src/shared/i18n/` 目录下
- 重启服务器后等待几秒钟让 Next.js 重新编译

### 问题 2: 翻译未显示

**症状**: 页面显示翻译键而不是实际文本

**解决方案**:
1. 检查 `messages/` 目录下的翻译文件是否存在
2. 确认翻译键名称正确
3. 检查控制台是否有错误信息
4. 确保 JSON 文件格式正确（无语法错误）

### 问题 3: 语言切换不工作

**症状**: 点击语言切换按钮后页面没有变化

**解决方案**:
1. 检查 `middleware.ts` 是否正确配置
2. 确认 `src/shared/i18n/config.ts` 中的 locales 配置正确
3. 检查浏览器控制台是否有路由错误
4. 确认 URL 中包含正确的语言前缀（如 `/zh/` 或 `/en/`）

### 问题 4: 默认语言重定向不工作

**症状**: 访问 `/` 没有自动重定向到 `/zh/`

**解决方案**:
1. 检查 `middleware.ts` 的 matcher 配置是否包含 `'/'`
2. 确认 `defaultLocale` 设置正确
3. 清除浏览器缓存后重试

### 问题 5: 样式丢失

**症状**: 页面样式不正常

**解决方案**:
1. 确认 Tailwind CSS 正确配置
2. 检查 `globals.css` 是否正确导入
3. 清除浏览器缓存后重试

## 开发者工具提示

### 查看当前语言

在浏览器控制台中运行：
```javascript
// 查看当前 URL 中的语言前缀
console.log(window.location.pathname);
```

### 手动切换语言

在浏览器控制台中运行：
```javascript
// 切换到英文
window.location.href = '/en' + window.location.pathname.replace(/^\/(zh|en)/, '');

// 切换到中文
window.location.href = '/zh' + window.location.pathname.replace(/^\/(zh|en)/, '');
```

## 性能检查

1. 打开浏览器开发者工具
2. 切换到 Network 标签
3. 刷新页面
4. 检查翻译文件加载时间（应该在 100ms 以内）
5. 确认没有重复加载翻译文件

## 快速测试清单

启动开发服务器后，验证以下功能：

- [ ] 访问 http://localhost:3000/ 自动重定向到 /zh/
- [ ] 访问 http://localhost:3000/zh/login 显示中文登录页
- [ ] 访问 http://localhost:3000/en/login 显示英文登录页
- [ ] 右上角语言切换按钮正常工作
- [ ] 切换语言后页面文本正确更新
- [ ] 浏览器控制台无错误信息
- [ ] 所有翻译键都有对应的译文
