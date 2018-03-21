export const routes = [{
  path: '/',
  redirect: '/permanent',
  component: () => import('@/views/home'),
  children: [
    {
      name: '全省地市概括',
      path: '/permanent',
      component: () => import('@/views/permanent'),
      icon: 'home'
    },
    {
      path: '/benchmarking',
      name: '全省城市对标',
      component: () => import('@/views/benchmarking'),
      icon: 'stats-bars'
    },
    {
      path: '/permission',
      name: '常驻人口分析',
      icon: 'funnel'
    },
    {
      path: '/permission',
      name: '流动人口分析',
      icon: 'shuffle'
    },
    {
      path: '/migration',
      name: '省市迁移分析',
      component: () => import('@/views/migration'),
      icon: 'model-s'
    },
    {
      path: '/permission',
      name: '系统管理',
      icon: 'gear-b'
    }
  ]
}]
