/**
 * xuanyu<969718197@qq.com>
 *
 * @type { *[] }
 */

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/me',
        name: 'Me',
        component: () => import('@/views/me/index'),
        mete: { title: '我的', KeepAlive: false }
      }
    ]
  }
]
