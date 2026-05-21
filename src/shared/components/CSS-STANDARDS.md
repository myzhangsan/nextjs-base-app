# CSS 样式管理规范

## 📋 概述

本项目遵循严格的CSS样式管理规范，确保代码的可维护性和性能优化。

## ✅ 规范原则

### 1. 静态样式必须外置

**所有固定的、可预定义的样式都必须放在外部CSS文件中。**

#### ❌ 错误示例（内联样式）
```tsx
<div 
  className="absolute top-20 left-20"
  style={{
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
    animation: 'float 8s ease-in-out infinite'
  }}
></div>
```

#### ✅ 正确示例（外部CSS）
```css
/* login-page.css */
.login-decoration--top-left {
  position: absolute;
  top: 5rem;
  left: 5rem;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite;
}
```

```tsx
<div className="login-decoration--top-left"></div>
```

### 2. 动态样式可以使用内联

**仅在以下情况下允许使用内联样式：**

1. **运行时生成的随机值**
   - 星星的随机位置（left, top）
   - 星星的随机大小（width, height）
   - 星星的随机透明度（opacity）

2. **用户交互产生的动态值**
   - 鼠标跟随效果
   - 拖拽位置
   - 实时计算的尺寸

3. **数据驱动的样式**
   - 从API获取的颜色值
   - 根据数据计算的比例

#### ✅ 合理示例
```tsx
// 星星的位置和大小是随机生成的，无法在CSS中预定义
{stars.map((star) => (
  <div
    key={star.id}
    className="starry-bg-star"
    style={{
      width: `${star.size}px`,        // 随机大小
      height: `${star.size}px`,       // 随机大小
      left: `${star.left}%`,          // 随机位置
      top: `${star.top}%`,            // 随机位置
      opacity: star.opacity,          // 随机透明度
      animationDuration: `${star.animationDuration}s`,  // 随机动画时长
    }}
  />
))}
```

## 📁 项目中的CSS文件组织

### 共享组件样式

```
src/shared/components/
├── starry-background.tsx          # 组件逻辑
├── starry-background.css          # 组件样式
└── README-starry-background.md    # 使用说明
```

### 页面级样式

```
src/app/(auth)/login/
├── page.tsx                       # 页面逻辑
└── login-page.css                 # 页面样式
```

## 🎯 BEM 命名规范

使用 **BEM** (Block Element Modifier) 命名规范：

### 结构
- **Block**: 独立的组件块（如 `starry-bg-nebula`）
- **Element**: 块的组成部分（如 `starry-bg-galaxy__band`）
- **Modifier**: 块或元素的状态/变体（如 `starry-bg-nebula--1`）

### 示例

```css
/* Block: 星云 */
.starry-bg-nebula {
  @apply absolute rounded-full blur-3xl pointer-events-none;
}

/* Modifier: 第1个星云 */
.starry-bg-nebula--1 {
  top: 25%;
  left: 25%;
  /* ... */
}

/* Block: 银河 */
.starry-bg-galaxy {
  @apply absolute inset-0 pointer-events-none;
}

/* Element: 银河光带 */
.starry-bg-galaxy__band {
  position: absolute;
  /* ... */
}
```

## 🔧 Tailwind CSS + 自定义CSS

项目结合使用 Tailwind CSS 和自定义CSS：

### 使用 Tailwind 的情况
- 布局类（flex, grid, absolute等）
- 间距类（p-4, m-2, gap-4等）
- 颜色类（bg-blue-500, text-white等）
- 响应式类（md:flex, lg:w-1/2等）

### 使用自定义CSS的情况
- 复杂的渐变背景
- 自定义动画关键帧
- 伪元素样式
- 需要复用的复杂样式组合

### 混合使用示例

```css
/* CSS文件中使用 @apply 引入Tailwind工具类 */
.starry-bg-star {
  @apply absolute rounded-full bg-white animate-pulse;
}
```

```tsx
/* JSX中直接使用Tailwind类 */
<div className="min-h-screen flex items-center justify-center">
  {/* ... */}
</div>
```

## 📊 样式迁移检查清单

在重构代码时，使用以下检查清单：

- [ ] 所有固定样式已移至CSS文件
- [ ] 使用了BEM命名规范
- [ ] 复杂渐变和动画定义在CSS中
- [ ] 仅动态值使用内联样式
- [ ] CSS文件已正确导入
- [ ] 移除了所有不必要的style属性
- [ ] 测试了视觉效果是否正常

## 🚀 性能优势

### 外部CSS的好处

1. **浏览器缓存**：CSS文件可以被缓存，减少重复加载
2. **样式复用**：相同的样式可以在多处使用
3. **更好的可维护性**：样式集中管理，易于修改
4. **更小的JS包**：减少JavaScript bundle大小
5. **更快的渲染**：浏览器可以并行下载CSS和JS

### 内联样式的劣势

1. **无法缓存**：每次渲染都需要重新解析
2. **代码冗余**：相同样式在多处重复
3. **难以维护**：样式分散在JSX中
4. **增加包体积**：样式代码包含在JS bundle中
5. **降低可读性**：JSX变得冗长复杂

## 📝 最佳实践总结

| 场景 | 推荐方式 | 原因 |
|------|---------|------|
| 固定布局和装饰 | 外部CSS | 可复用、易维护 |
| 随机生成的位置/大小 | 内联样式 | 必须在运行时计算 |
| 用户交互效果 | 内联样式 | 动态更新 |
| 主题色/品牌色 | 外部CSS | 统一管理 |
| 动画定义 | 外部CSS | 性能更好 |
| 响应式布局 | Tailwind类 | 简洁高效 |

## 🔍 代码审查要点

在Code Review时，重点关注：

1. ❌ 是否有不必要的内联样式
2. ✅ 是否正确使用BEM命名
3. ✅ 是否在合适的地方使用Tailwind
4. ✅ CSS文件是否正确导入
5. ✅ 样式是否可以复用

---

**最后更新**：2026-05-21  
**维护者**：开发团队
