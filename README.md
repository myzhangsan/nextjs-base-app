# nextjs-base-app

Next.js 基础项目，集成了 shadcn/ui 组件库。

## 技术栈

- **Next.js 16** - React 全栈框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式方案
- **shadcn/ui** - UI 组件库
- **Zustand** - 状态管理
- **Lucide React** - 图标库

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发环境
pnpm dev

# 生产构建
pnpm build

# 启动生产服务器
pnpm start
```

## shadcn/ui 使用指南

### 添加新组件

```bash
# 添加单个组件
pnpm dlx shadcn@latest add [component-name]

# 示例
pnpm dlx shadcn@latest add dialog table dropdown-menu select tabs
```

### 已安装的组件

- ✅ Button - 按钮
- ✅ Input - 输入框
- ✅ Card - 卡片

### 使用示例

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Example() {
  return (
    <Card>
      <Input placeholder="请输入..." />
      <Button>提交</Button>
    </Card>
  );
}
```

## 项目结构

```
src/
├── app/              # Next.js 页面
├── components/       # UI 组件 (shadcn/ui)
│   └── ui/          # shadcn/ui 组件
├── lib/             # 工具函数
│   └── utils.ts     # cn() 类名合并函数
└── shared/          # 共享模块
    ├── auth/        # 认证相关
    └── router/      # 路由管理
```

## 更多资源

- [shadcn/ui 文档](https://ui.shadcn.com/)
- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
