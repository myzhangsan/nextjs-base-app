import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Next.js 配置
 * 集成 next-intl 国际化插件
 */
const nextConfig: NextConfig = {};

// 指定 i18n 配置文件路径
const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

export default withNextIntl(nextConfig);
