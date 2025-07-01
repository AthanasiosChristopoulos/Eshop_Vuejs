import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '../views/EditView.vue'
import ShopView from '../views/ShopView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditView,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView,  
    }
  ],
})

export default router
