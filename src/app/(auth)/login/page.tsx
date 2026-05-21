"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { setToken } from "@/shared/auth/session";
import { useRouter } from "next/navigation";
import { StarryBackground } from "@/shared/components/starry-background";
import './login-page.css';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      // 模拟设置token
      setToken("mock_token_" + Date.now());
      setLoading(false);
      
      // 跳转到仪表板
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* 星空DNA背景 */}
      <StarryBackground showDnaLink={true} nodeDensity={12000} />
      
      {/* 浮动装饰元素 */}
      <div className="login-floating-decorations">
        {/* 左上角装饰 */}
        <div className="login-decoration--top-left"></div>
        
        {/* 右下角装饰 */}
        <div className="login-decoration--bottom-right"></div>
        
        {/* 右上角装饰 */}
        <div className="login-decoration--top-right"></div>
      </div>
      
      {/* 登录卡片 */}
      <div className="relative z-10 w-full max-w-md">
        {/* 外层光晕效果 */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-lg opacity-30 animate-pulse-glow"></div>
        
        <Card className="relative backdrop-blur-xl bg-white/90 border border-white/50 shadow-2xl rounded-2xl overflow-hidden">
          {/* 顶部装饰条 */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          {/* 项目名称和版本 */}
          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-sm font-bold text-gray-800">Next.js Base App</h1>
                  <p className="text-xs text-gray-500">v0.1.0</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
          
          <CardHeader className="space-y-1 pb-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              欢迎登录
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              请输入您的账号和密码以继续
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  用户名
                </label>
                <div className="relative group">
                  <Input
                    type="text"
                    placeholder="请输入用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10 pr-4 py-6 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl bg-white/70 backdrop-blur-sm group-hover:border-blue-300"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  密码
                </label>
                <div className="relative group">
                  <Input
                    type="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-4 py-6 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 rounded-xl bg-white/70 backdrop-blur-sm group-hover:border-purple-300"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              
              {/* 记住我和忘记密码 */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="text-gray-600 group-hover:text-gray-800 transition-colors">记住我</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline">
                  忘记密码？
                </a>
              </div>
            </CardContent>
            
            <CardFooter className="pt-2 pb-6">
              <Button 
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl" 
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    登录中...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    登录
                  </div>
                )}
              </Button>
            </CardFooter>
          </form>
          
          {/* 底部装饰 */}
          <div className="px-6 pb-4 text-center">
            <p className="text-sm text-gray-500">
              还没有账号？{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline">
                立即注册
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
