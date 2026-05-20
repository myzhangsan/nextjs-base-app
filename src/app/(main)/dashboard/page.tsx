"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { LayoutDashboard, Users, Settings, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "总用户数",
    value: "1,234",
    description: "较上月增长 +12%",
    icon: Users,
  },
  {
    title: "活跃用户",
    value: "892",
    description: "当前在线",
    icon: TrendingUp,
  },
  {
    title: "系统状态",
    value: "正常",
    description: "运行时间 99.9%",
    icon: LayoutDashboard,
  },
  {
    title: "待处理",
    value: "23",
    description: "需要关注",
    icon: Settings,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">仪表板</h1>
        <p className="text-muted-foreground mt-1">
          欢迎回来，这是您的系统概览
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
          <CardDescription>常用的系统管理功能</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button>新建项目</Button>
          <Button variant="outline">查看报告</Button>
          <Button variant="secondary">系统设置</Button>
        </CardContent>
      </Card>
    </div>
  );
}
