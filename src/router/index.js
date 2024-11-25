import { createRouter, createWebHistory } from 'vue-router'; //createWebHashHistory

export const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: { title: '首頁' },
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('@/views/echarts/index.vue'),
    meta: { title: 'echarts圖表' },
  },
  {
    path: '/tailwind',
    name: 'tailwind',
    component: () => import('@/views/tailwind/index.vue'),
    meta: { title: 'tailwindCSS' },
  },
];

const router = createRouter({
  // 4. 內部提供了 history 模式的實作。
  history: createWebHistory(),
  routes, // `routes: routes` 的縮寫
});

export default router;
