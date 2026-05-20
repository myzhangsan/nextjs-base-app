import { redirect } from 'next/navigation';
import { getToken } from '@/shared/auth/session';

export default function HomePage() {
  // 检查用户是否已登录
  const token = getToken();
  
  if (token) {
    // 如果已登录，重定向到仪表板
    redirect('/dashboard');
  } else {
    // 如果未登录，重定向到登录页面
    redirect('/login');
  }
}