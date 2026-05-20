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

### 状态管理

- **Zustand**: 轻量级状态管理库

### 图标库

- **Lucide React**: 现代图标库

### 开发工具

- **ESLint**: 代码质量检查
- **eslint-config-next**: Next.js 推荐的 ESLint 配置

## 项目结构

```
nextjs-base-app/
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
│   └── shared/                # 共享模块
│       ├── auth/
│       │   └── session.ts     # 会话管理（Token 操作）
│       └── router/
│           ├── menus.ts       # 菜单配置
│           └── routes.ts      # 路由常量定义
├── public/                    # 静态资源目录
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
- `router/`: 路由管理相关功能（路由常量、菜单配置等）

## 核心功能模块

### 1. 路由系统 (`src/shared/router/`)

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
export const menus = [
  {
    title: "首页",
    path: routes.dashboard,
  },
  {
    title: "用户管理",
    path: routes.users,
  },
];
```

### 2. 认证系统 (`src/shared/auth/session.ts`)

基于 localStorage 的 Token 管理：

- `getToken()`: 获取访问令牌
- `setToken(token)`: 设置访问令牌
- `clearToken()`: 清除访问令牌

**注意**: 当前实现使用 localStorage，仅适用于客户端。服务端渲染时返回 null。

### 3. 页面布局

#### 根布局 (`src/app/layout.tsx`)

- 设置 HTML 语言为中文 (zh-CN)
- 引入全局样式
- 定义元数据（标题、描述）

#### 主应用布局 (`src/app/(main)/layout.tsx`)

- 用于包裹需要认证的主应用页面
- 可扩展添加导航栏、侧边栏等组件

#### 路由分组

- `(auth)`: 认证相关页面（登录、注册等）
- `(main)`: 需要认证的主应用页面

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
