# Shared Components - 依赖说明

本目录包含跨项目复用的通用 UI 组件和工具函数。

## 📦 必需依赖

使用本目录中的组件前，请确保项目中已安装以下依赖：

### 核心依赖

```bash
pnpm add react react-dom next
```

### shadcn/ui 组件依赖

```bash
# Radix UI 组件（UI 基础）
pnpm add @radix-ui/react-slot

# 类名处理工具
pnpm add clsx tailwind-merge

# 样式变体管理
pnpm add class-variance-authority
```

### Tailwind CSS 配置

确保项目中已正确配置 Tailwind CSS：

```bash
pnpm add tailwindcss @tailwindcss/postcss postcss
```

并在 `tailwind.config.ts` 中配置内容路径：

```typescript
content: [
  "./src/shared/components/**/*.{ts,tsx}",
  // ...其他路径
]
```

## 🎨 图标库（可选）

如果需要使用图标，建议安装 Lucide React：

```bash
pnpm add lucide-react
```

## 📝 使用说明

### 导入组件

```typescript
// 从 shared 目录导入通用组件
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/utils/cn";
```

### 添加新组件

使用 shadcn/ui CLI 添加新组件时，注意修改目标路径：

```bash
# 默认会添加到 src/components/ui，需要手动移动到 src/shared/components/ui
pnpm dlx shadcn@latest add dialog

# 或者使用自定义路径（需要在 components.json 中配置）
```

## ⚙️ components.json 配置

确保 `components.json` 中的 aliases 配置正确：

```json
{
  "aliases": {
    "components": "@/shared/components",
    "utils": "@/shared/utils/cn",
    "ui": "@/shared/components/ui"
  }
}
```

## 🔄 跨项目复用

本目录设计为可跨项目复用，复制时需注意：

1. 确保目标项目已安装所有必需依赖
2. 检查 Tailwind CSS 配置是否包含本目录路径
3. 更新目标项目的 `components.json` 配置
4. 如有自定义主题变量，需同步复制 `globals.css` 中的相关定义

## 📋 当前包含的组件

- **Button** - 按钮组件（支持多种变体和尺寸）
- **Card** - 卡片组件（包含 Header、Title、Description、Content、Footer）
- **Input** - 输入框组件

## 🔧 工具函数

- **cn()** - 类名合并工具，用于条件性地合并 Tailwind CSS 类名
