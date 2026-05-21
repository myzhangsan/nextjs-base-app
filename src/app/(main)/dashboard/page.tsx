"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { LayoutDashboard, Users, Settings, TrendingUp } from "lucide-react";
import { useTranslations } from 'next-intl';

const stats = [
  {
    title: "totalUsers",
    value: "1,234",
    description: "growthRate",
    icon: Users,
  },
  {
    title: "activeUsers",
    value: "892",
    description: "onlineNow",
    icon: TrendingUp,
  },
  {
    title: "systemStatus",
    value: "正常",
    description: "uptime",
    icon: LayoutDashboard,
  },
  {
    title: "pendingItems",
    value: "23",
    description: "needsAttention",
    icon: Settings,
  },
];

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t(stat.title as any)}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {t(stat.description as any)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
          <CardDescription>{t('quickActionsDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button>{t('newProject')}</Button>
          <Button variant="outline">{t('viewReport')}</Button>
          <Button variant="secondary">{t('systemSettings')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
