# AGENTS.MD - Next.js Base App 开发文档

> **重要提示**: 在开始任何开发工作之前，请优先查阅本文档以了解项目结构、规范和最佳实践。

## 项目概述

**项目名称**: nextjs-base-app  
**版本**: 0.1.0  
**描述**: 基础 Next.js 项目，提供认证系统、路由管理和基础布局结构

## 技术栈

### 核心框架

- **Next.js**: 最新版本的 React 全栈框架（App Router）
- **React**: 最新版本的 UI 库
- **TypeScript**: 类型安全的 JavaScript 超集

### 样式方案

- **Tailwind CSS**: 实用优先的 CSS 框架
- **@tailwindcss/postcss**: Tailwind CSS 的 PostCSS 插件（Next.js 内置支持）
- **shadcn/ui**: 基于 Radix UI 和 Tailwind CSS 的组件库

### 状态管理

- **Zustand**: 轻量级状态管理库

### 国际化

- **next-intl**: Next.js 国际化解决方案

### 图标库

- **Lucide React**: 现代图标库（shadcn/ui 默认使用）

### 开发工具

- **ESLint**: 代码质量检查
- **eslint-config-next**: Next.js 推荐的 ESLint 配置

## 项目结构

```
nextjs-base-app/
├── messages/                  # 国际化翻译文件
│   ├── zh.json               # 中文翻译
│   └── en.json               # 英文翻译
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── (auth)/            # 认证相关路由组
│   │   │   └── login/
│   │   │       └── page.tsx   # 登录页面
│   │   ├── (main)/            # 主应用路由组
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx   # 仪表板页面
│   │   │   └── layout.tsx     # 主应用布局
│   │   ├── globals.css        # 全局样式
│   │   └── layout.tsx         # 根布局
│   └── shared/                # 共享模块（跨项目复用）
│       ├── auth/
│       │   └── session.ts     # 会话管理（Token 操作）
│       ├── i18n/
│       │   ├── config.ts      # 国际化配置
│       │   ├── request.ts     # next-intl 请求配置
│       │   └── README.md      # 国际化使用指南
│       ├── router/
│       │   ├── menus.ts       # 菜单配置
│       │   └── routes.ts      # 路由常量定义
│       ├── components/        # 通用 UI 组件
│       │   ├── ui/            # shadcn/ui 组件
│       │   │   ├── button.tsx     # 按钮组件
│       │   │   ├── card.tsx       # 卡片组件
│       │   │   └── input.tsx      # 输入框组件
│       │   └── language-switcher.tsx  # 语言切换器
│       └── utils/
│           └── cn.ts          # 通用工具函数（cn 类名合并）
├── public/                    # 静态资源目录
├── next.config.ts             # Next.js 配置文件（含 next-intl 插件）
├── middleware.ts              # 国际化中间件
├── components.json            # shadcn/ui 配置文件
├── package.json
├── tsconfig.json
├── next-env.d.ts
└── README.md
```

## Shared 模块说明

`src/shared/` 目录包含全局通用的组件和工具函数，具有以下特点：

- **跨项目复用**: 该目录中的代码设计为可在任意 Next.js 项目中直接使用
- **独立性**: 不依赖特定业务逻辑，保持高内聚低耦合
- **标准化接口**: 提供统一的 API 接口，便于在不同项目中集成
- **可移植性**: 可直接复制到其它项目中使用，无需额外配置

### 当前包含的共享模块

- `auth/`: 认证相关功能（会话管理、Token 操作等）
- `i18n/`: 国际化相关功能（配置、使用指南等）
- `router/`: 路由管理相关功能（路由常量、菜单配置等）
- `components/ui/`: 通用 UI 组件库（shadcn/ui 基础组件）
- `components/language-switcher.tsx`: 语言切换器组件
- `utils/`: 通用工具函数（类名合并等）

## 核心功能模块

### 1. UI 组件库 (shadcn/ui)

#### 组件使用方式

shadcn/ui 组件位于 `src/shared/components/ui/` 目录，可以直接导入使用：

```typescript
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
```

#### 添加新组件

使用 CLI 命令添加新组件：

```bash
# 添加单个组件
pnpm dlx shadcn@latest add [component-name]

# 示例
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add dropdown-menu
```

常用组件推荐：
- `dialog`: 对话框/模态框
- `table`: 数据表格
- `dropdown-menu`: 下拉菜单
- `select`: 选择器
- `tabs`: 标签页
- `form`: 表单组件（配合 react-hook-form）
- `toast`: 消息提示

#### 工具函数

`src/shared/utils/cn.ts` 提供了 `cn()` 函数用于合并类名：

```typescript
import { cn } from "@/shared/utils/cn";

// 使用示例
<div className={cn("base-class", condition && "conditional-class", props.className)} />
```

### 3. 国际化系统 (next-intl)

项目使用 `next-intl` 实现多语言支持，当前支持中文 (zh) 和英文 (en)。

#### 翻译文件

翻译文件位于 `messages/` 目录：

```typescript
// messages/zh.json - 中文翻译
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

#### 在组件中使用

**客户端组件：**

```typescript
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

**服务端组件：**

```typescript
import { getTranslations } from 'next-intl/server';

export default async function MyPage() {
  const t = await getTranslations('dashboard');
  
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}
```

#### 语言切换

使用内置的 `LanguageSwitcher` 组件：

```typescript
import { LanguageSwitcher } from '@/shared/components/language-switcher';

export function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

#### 添加新语言

1. 在 `src/shared/i18n/config.ts` 中添加新语言
2. 创建对应的翻译文件（如 `messages/ja.json`）
3. 更新 `middleware.ts` 中的 matcher

详细使用说明请参考：`src/shared/i18n/README.md`

### 4. 路由系统 (`src/shared/router/`)

#### 路由常量定义 (`routes.ts`)

```typescript
export const routes = {
  login: "/login",
  dashboard: "/dashboard",
  users: "/users",
} as const;
```

#### 菜单配置 (`menus.ts`)

```typescript
import { routes } from "./routes";

/**
 * 菜单配置
 * 注意：实际使用时应通过国际化翻译获取标题
 */
export const menus = [
  {
    title: "home",  // 使用翻译键，而非硬编码文本
    path: routes.dashboard,
  },
  {
    title: "users",
    path: routes.users,
  },
];
```

### 5. 认证系统 (`src/shared/auth/session.ts`)

基于 localStorage 的 Token 管理：

- `getToken()`: 获取访问令牌
- `setToken(token)`: 设置访问令牌
- `clearToken()`: 清除访问令牌

**注意**: 当前实现使用 localStorage，仅适用于客户端。服务端渲染时返回 null。

### 6. 页面布局

#### 根布局 (`src/app/layout.tsx`)

- 设置 HTML 语言为中文 (zh-CN)
- 引入全局样式
- 定义元数据（标题、描述）
- 集成 NextIntlClientProvider 以支持国际化

#### 主应用布局 (`src/app/(main)/layout.tsx`)

- 用于包裹需要认证的主应用页面
- 包含顶部导航栏和语言切换器
- 可扩展添加其他组件

#### 路由分组

- `(auth)`: 认证相关页面（登录、注册等）
- `(main)`: 需要认证的主应用页面

#### 国际化路由

启用国际化后，URL 将包含语言前缀：
- `/zh/login` - 中文登录页
- `/en/login` - 英文登录页
- `/zh/dashboard` - 中文仪表板
- `/en/dashboard` - 英文仪表板

## 开发规范

### 依赖管理规范

**重要**: 添加或更新项目依赖时，必须遵循以下安全原则：

1. **优先选择无漏洞版本**
   - 在添加新依赖前，先检查该依赖是否存在已知安全漏洞
   - 使用 `pnpm audit` 或 `npm audit` 检查依赖安全性
   - 优先选择已修复漏洞的最新稳定版本

2. **必须使用有漏洞依赖时的处理方案**
   - 如果业务需求必须使用存在漏洞的依赖版本，必须在 package.json 中提供解决方案
   - 使用 pnpm 的 `overrides` 字段强制覆盖子依赖的安全版本
   - 示例：

     ```json
     {
       "pnpm": {
         "overrides": {
           "postcss": "^8.5.10"
         }
       }
     }
     ```

   - 在代码注释或文档中说明使用该版本的原因和风险评估

3. **定期安全检查**
   - 定期运行 `pnpm audit` 检查项目依赖安全性
   - 及时更新依赖以修复已知漏洞
   - 关注依赖包的安全公告

### 文档同步规范

**重要**: 当修改以下项目规格时，必须同步更新 AGENTS.MD 文件：

1. **目录结构调整**
   - 新增/删除/重命名目录
   - 修改目录层级关系
   - 更新「项目结构」章节的树形图

2. **功能模块变更**
   - 新增/删除功能模块
   - 修改模块路径或文件名
   - 更新「核心功能模块」章节的相关描述

3. **路由系统调整**
   - 新增/删除路由
   - 修改路由常量定义
   - 更新 `routes.ts` 代码示例和「路由系统」章节

4. **菜单配置变更**
   - 新增/删除菜单项
   - 修改菜单路径或标题
   - 更新 `menus.ts` 代码示例和「菜单配置」章节

5. **技术栈变更**
   - 新增/移除依赖包
   - 升级主要框架版本
   - 更新「技术栈」章节

6. **认证系统调整**
   - 修改 Token 管理方式
   - 变更会话存储机制
   - 更新「认证系统」章节和认证流程说明

7. **布局结构变更**
   - 新增/修改布局组件
   - 调整路由分组
   - 更新「页面布局」章节

**检查清单**：

- [ ] 项目结构树形图是否与实际目录一致
- [ ] 所有代码示例是否与源文件内容匹配
- [ ] 功能模块描述是否准确反映当前实现
- [ ] 路由和菜单配置是否与代码同步
- [ ] 版本号是否需要更新

### 代码注释规范

**重要**: 为了提高代码可读性和维护性，以下元素必须添加适当的注释：

1. **公共 API 和导出函数**
   - 所有导出的函数、类、接口都需要 JSDoc 注释
   - 说明函数的用途、参数含义和返回值
   - 示例：
     ```typescript
     /**
      * 获取用户访问令牌
      * @returns {string | null} 访问令牌字符串，未登录时返回 null
      */
     export function getToken(): string | null {
       // 实现代码
     }
     ```

2. **复杂业务逻辑**
   - 对于复杂的算法、条件判断或业务流程，需要添加行内注释说明逻辑意图
   - 解释为什么这样做，而不仅仅是做什么
   - 避免显而易见的注释（如 `// 设置变量为 true`）

3. **重要的类型定义和接口**
   - 自定义类型、接口需要注释说明其用途
   - 关键属性需要单独注释说明
   - 示例：
     ```typescript
     /**
      * 用户信息接口
      */
     interface UserInfo {
       /** 用户唯一标识 */
       id: string;
       /** 用户显示名称 */
       name: string;
       /** 用户角色列表 */
       roles: string[];
     }
     ```

4. **配置常量和枚举**
   - 路由常量、配置项需要注释说明其用途
   - 枚举值需要说明每个值的含义
   - 示例：
     ```typescript
     /**
      * 应用路由常量
      */
     export const routes = {
       /** 登录页面路径 */
       login: "/login",
       /** 仪表板页面路径 */
       dashboard: "/dashboard",
     } as const;
     ```

5. **组件 Props 接口**
   - React 组件的 Props 接口需要完整注释
   - 说明每个属性的作用、是否必填、默认值等
   - 示例：
     ```typescript
     /**
      * 按钮组件属性
      */
     interface ButtonProps {
       /** 按钮显示文本 */
       label: string;
       /** 按钮类型，默认为 "primary" */
       variant?: "primary" | "secondary" | "outline";
       /** 点击事件处理函数 */
       onClick?: () => void;
     }
     ```

6. **特殊实现和临时方案**
   - 使用 TODO、FIXME、HACK 等标记时需要详细说明原因
   - 临时解决方案需要注明预计修复时间或替代方案
   - 示例：
     ```typescript
     // TODO: 待优化 - 当前使用 localStorage，后续迁移到 HttpOnly Cookie
     // FIXME: 在 SSR 环境下无法访问 localStorage，需要服务端兼容处理
     ```

**注释语言规范**：
- 优先使用中文注释，便于团队理解
- 技术术语可保留英文
- 保持注释简洁明了，避免冗长

## 常用命令

```bash
# 开发环境启动
pnpm dev

# 生产构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint
```
