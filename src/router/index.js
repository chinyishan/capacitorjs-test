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
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor/index.vue'),
    meta: { title: '編輯器' },
  },
  {
    path: '/pdf-kit',
    name: 'pdf-kit',
    component: () => import('@/views/pdf-kit/index.vue'),
    meta: { title: 'PDFkit' },
  },
  {
    path: '/html2canvas',
    name: 'html2canvas',
    component: () => import('@/views/html2canvas/index.vue'),
    meta: { title: 'html2canvas' },
  },
  {
    path: '/print',
    name: 'print',
    component: () => import('@/views/print/index.vue'),
    meta: { title: 'print列印' },
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('@/views/echarts/index.vue'),
    meta: { title: 'echarts圖表' },
  },
  {
    path: '/vue-code',
    name: 'vue-code',
    component: () => import('@/views/vue-code/index.vue'),
    meta: { title: 'vue的測試code' },
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('@/views/sign/index.vue'),
    meta: { title: '線上簽署名字' },
  },
];

const router = createRouter({
  // 4. 內部提供了 history 模式的實作。
  history: createWebHistory(),
  routes, // `routes: routes` 的縮寫
});

export default router;
