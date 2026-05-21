# StarryBackground 星空DNA背景组件

## 📖 概述

`StarryBackground` 是一个通用的星空背景组件，提供璀璨的星空效果和动态DNA链路动画。该组件可以在任何页面中复用，为应用增添科技感和视觉吸引力。

## ✨ 特性

- 🌟 **150颗星星**：包括基础白色星星、明亮光晕星星和彩色星星
- 🔗 **DNA链路动画**：动态节点网络，带鼠标交互效果
- 🎨 **星云效果**：3个大型渐变星云，缓慢浮动
- 🌌 **银河光带**：横跨屏幕的银河光带效果
- ⚡ **高性能**：使用Canvas API实现流畅的60fps动画
- 🎯 **可配置**：支持自定义节点密度和是否显示DNA链路

## 📦 使用方法

### 基本用法

```tsx
import { StarryBackground } from "@/shared/components/starry-background";

export default function MyPage() {
  return (
    <div className="min-h-screen relative">
      {/* 星空背景 */}
      <StarryBackground />
      
      {/* 页面内容 */}
      <div className="relative z-10">
        {/* 你的内容 */}
      </div>
    </div>
  );
}
```

### 高级配置

```tsx
// 只显示星空，不显示DNA链路
<StarryBackground showDnaLink={false} />

// 调整节点密度（数值越小，节点越多）
<StarryBackground nodeDensity={8000} />

// 完整配置
<StarryBackground 
  showDnaLink={true}
  nodeDensity={12000}
  className="custom-class"
/>
```

## 🎛️ Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showDnaLink` | `boolean` | `true` | 是否显示DNA链路动画 |
| `nodeDensity` | `number` | `12000` | DNA节点密度（数值越小节点越多） |
| `className` | `string` | `''` | 自定义类名 |

## 💡 使用场景

### 1. 登录/注册页面

```tsx
<div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
  <StarryBackground showDnaLink={true} nodeDensity={12000} />
  
  <Card className="relative z-10">
    {/* 登录表单 */}
  </Card>
</div>
```

### 2. 仪表板页面

```tsx
<div className="min-h-screen relative">
  <StarryBackground showDnaLink={true} nodeDensity={15000} />
  
  <main className="relative z-10 p-8">
    {/* 仪表板内容 */}
  </main>
</div>
```

### 3. 404页面

```tsx
<div className="min-h-screen flex items-center justify-center relative">
  <StarryBackground showDnaLink={false} />
  
  <div className="text-center relative z-10">
    <h1 className="text-6xl font-bold">404</h1>
    <p>页面未找到</p>
  </div>
</div>
```

### 4. 加载页面

```tsx
<div className="min-h-screen flex items-center justify-center relative">
  <StarryBackground showDnaLink={true} nodeDensity={10000} />
  
  <div className="relative z-10">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    <p className="mt-4 text-white">加载中...</p>
  </div>
</div>
```

## 🎨 视觉效果说明

### 星星系统

1. **基础星星**（100颗）
   - 大小：1-4px
   - 透明度：20%-100%
   - 颜色：白色
   - 动画：脉冲闪烁

2. **明亮星星**（20颗）
   - 大小：2-6px
   - 颜色：径向渐变（白→蓝→透明）
   - 光晕：蓝色和紫色双层光晕
   - 动画：慢速脉冲

3. **彩色星星**（30颗）
   - 大小：2-5px
   - 颜色：金色、蓝色、紫色、绿色、粉色
   - 光晕：同色光晕
   - 动画：中速脉冲

### DNA链路动画

- **节点数量**：根据屏幕面积和密度自动计算
- **节点颜色**：蓝色到紫色的渐变色系
- **连接线**：距离<100px的节点之间绘制渐变线条
- **排斥力**：节点距离<50px时产生排斥，防止聚集
- **鼠标交互**：鼠标周围120px内的节点会被吸引
- **速度限制**：最大速度2px/frame，保证流畅

### 星云效果

- **数量**：3个大型星云
- **尺寸**：72x72px 到 96x96px
- **颜色**：蓝紫、紫蓝、粉蓝渐变
- **动画**：25-35秒缓慢浮动
- **位置**：分散在屏幕不同区域

### 银河光带

- **位置**：屏幕上方1/3处
- **角度**：旋转-15度
- **颜色**：蓝→紫→青渐变
- **动画**：10秒脉冲效果

## 🔧 性能优化建议

1. **调整节点密度**
   - 移动端：建议使用 `nodeDensity={15000}` 或更高
   - 桌面端：可以使用 `nodeDensity={10000}` 获得更密集的效果

2. **禁用DNA链路**
   - 如果只需要静态星空，设置 `showDnaLink={false}`
   - 可以显著降低CPU使用率

3. **避免过度嵌套**
   - 确保内容层使用 `z-index` 正确分层
   - 背景层保持 `zIndex: 0`，内容层使用更高的z-index

## 📝 注意事项

1. **客户端组件**：该组件使用了 `'use client'`，只能在客户端渲染
2. **随机数据**：星星数据在组件挂载时生成，每次刷新会重新随机
3. **响应式**：Canvas会自动适应窗口大小变化
4. **浏览器兼容**：需要支持Canvas API的现代浏览器

## 🎯 最佳实践

```tsx
// ✅ 推荐：在页面根元素中使用
export default function Page() {
  return (
    <div className="relative min-h-screen">
      <StarryBackground />
      <Content />
    </div>
  );
}

// ❌ 避免：不要在循环中重复创建
export default function BadExample() {
  return (
    <>
      {items.map(item => (
        <div key={item.id}>
          <StarryBackground /> {/* 不要这样做 */}
          <ItemContent />
        </div>
      ))}
    </>
  );
}
```

## 🚀 扩展建议

如果需要更多自定义效果，可以：

1. **修改星星颜色**：编辑 `generateStars` 函数中的颜色数组
2. **调整动画速度**：修改 `animationDuration` 的范围
3. **添加新效果**：在组件中添加新的装饰层
4. **自定义节点样式**：修改 `createDnaNodes` 中的节点属性

## 📄 文件位置

- **组件文件**：`src/shared/components/starry-background.tsx`
- **样式文件**：`src/shared/components/starry-background.css`
- **使用示例**：`src/app/(auth)/login/page.tsx`

## ✨ 最佳实践

### 样式管理

本组件遵循 CSS 最佳实践：

1. **静态样式**：所有固定的样式（星云、银河光带等）都放在外部 CSS 文件中
2. **动态样式**：仅在必要时使用内联样式（如星星的随机位置、大小等）
3. **CSS 类名**：使用 BEM 命名规范（如 `starry-bg-nebula--1`）
4. **Tailwind + CSS**：结合使用 Tailwind 工具类和自定义 CSS

### 性能优化

- Canvas 动画使用 `requestAnimationFrame` 确保流畅性
- 星星数据在客户端生成，避免 SSR 水合错误
- 使用 CSS 动画而非 JS 动画，减少主线程负担

---

**最后更新**：2026-05-21
