/**
 * 星空DNA链路背景组件
 * @description 提供璀璨星空和动态DNA链路的背景效果
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './starry-background.css';

// DNA链节点类型
interface DnaNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

// 星星数据接口
interface Star {
  id: number;
  size: number;
  opacity: number;
  left: number;
  top: number;
  animationDuration: number;
  animationDelay: number;
}

interface BrightStar {
  id: number;
  size: number;
  left: number;
  top: number;
  animationDuration: number;
  animationDelay: number;
}

interface ColorfulStar {
  id: number;
  size: number;
  left: number;
  top: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
}

interface StarryBackgroundProps {
  /** 是否显示DNA链路动画 */
  showDnaLink?: boolean;
  /** DNA节点密度（数值越小节点越多） */
  nodeDensity?: number;
  /** 自定义类名 */
  className?: string;
}

export function StarryBackground({ 
  showDnaLink = true, 
  nodeDensity = 12000,
  className = '' 
}: StarryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dnaNodesRef = useRef<DnaNode[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();
  
  // 星星数据状态 - 使用state避免SSR水合错误
  const [stars, setStars] = useState<Star[]>([]);
  const [brightStars, setBrightStars] = useState<BrightStar[]>([]);
  const [colorfulStars, setColorfulStars] = useState<ColorfulStar[]>([]);

  // 生成星星数据（仅在客户端执行）
  useEffect(() => {
    // 基础星星 - 100颗
    const newStars: Star[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 4 + 2,
      animationDelay: Math.random() * 4,
    }));
    setStars(newStars);

    // 明亮星星 - 20颗
    const newBrightStars: BrightStar[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 4,
    }));
    setBrightStars(newBrightStars);

    // 彩色星星 - 30颗
    const colors = [
      'rgba(255, 200, 100, 0.8)',   // 金色
      'rgba(100, 200, 255, 0.8)',   // 蓝色
      'rgba(200, 100, 255, 0.8)',   // 紫色
      'rgba(100, 255, 200, 0.8)',   // 绿色
      'rgba(255, 150, 200, 0.8)',   // 粉色
    ];
    const newColorfulStars: ColorfulStar[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: Math.random() * 3 + 3,
      animationDelay: Math.random() * 4,
    }));
    setColorfulStars(newColorfulStars);
  }, []);

  // Canvas动画初始化
  useEffect(() => {
    if (!showDnaLink) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 创建DNA节点
    const createDnaNodes = () => {
      const nodes: DnaNode[] = [];
      const nodeCount = Math.floor((canvas.width * canvas.height) / nodeDensity);
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2.5 + 1.2,
          color: `hsl(${200 + Math.random() * 60}, 70%, ${60 + Math.random() * 20}%)`
        });
      }
      dnaNodesRef.current = nodes;
    };

    createDnaNodes();

    // 鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const nodes = dnaNodesRef.current;
      const mouse = mouseRef.current;
      
      nodes.forEach((node, i) => {
        // 更新位置
        node.x += node.vx;
        node.y += node.vy;

        // 节点之间的排斥力 - 防止聚集
        nodes.forEach((otherNode, j) => {
          if (i === j) return;
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 50 && distance > 0) {
            const force = (50 - distance) / 50;
            node.vx += (dx / distance) * force * 0.1;
            node.vy += (dy / distance) * force * 0.1;
          }
        });

        // 边界检测
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // 鼠标交互
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const force = (120 - distance) / 120;
          node.vx += dx * force * 0.005;
          node.vy += dy * force * 0.005;
        }

        // 限制速度
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 2) {
          node.vx = (node.vx / speed) * 2;
          node.vy = (node.vy / speed) * 2;
        }

        // 绘制节点
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // 绘制连接线
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j];
          const dx = otherNode.x - node.x;
          const dy = otherNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            
            const opacity = (100 - distance) / 100;
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.4})`);
            gradient.addColorStop(1, `rgba(147, 51, 234, ${opacity * 0.4})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 1.5;
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [showDnaLink, nodeDensity]);

  return (
    <>
      {/* Canvas层 - DNA链路动画 */}
      {showDnaLink && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-[1]"
        />
      )}

      {/* 星河背景层 */}
      <div className="absolute inset-0 z-0">
        {/* 基础星星 */}
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="starry-bg-star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.6})`
            }}
          />
        ))}
        
        {/* 明亮星星 */}
        {brightStars.map((star) => (
          <div
            key={`bright-star-${star.id}`}
            className="starry-bg-bright-star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`,
              boxShadow: `0 0 ${star.size * 3}px rgba(100, 150, 255, 0.6), 0 0 ${star.size * 5}px rgba(150, 100, 255, 0.3)`
            }}
          />
        ))}

        {/* 彩色星星 */}
        {colorfulStars.map((star) => (
          <div
            key={`colorful-star-${star.id}`}
            className="starry-bg-colorful-star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              backgroundColor: star.color,
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`
            }}
          />
        ))}
      </div>

      {/* 星云效果层 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="starry-bg-nebula starry-bg-nebula--1"></div>
        <div className="starry-bg-nebula starry-bg-nebula--2"></div>
        <div className="starry-bg-nebula starry-bg-nebula--3"></div>
      </div>

      {/* 银河光带 */}
      <div className="starry-bg-galaxy">
        <div className="starry-bg-galaxy__band"></div>
      </div>
    </>
  );
}
