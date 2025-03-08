import { createRouter, createWebHistory } from 'vue-router'
import AddressForm from '@/views/AddressForm.vue'
import AddressList from "@/views/AddressList.vue";
// import AddressList from '@/views/AddressList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AddressForm',
      component: AddressForm,
    },
    {
      path: '/addresses',
      name: 'AddressList',
      component: AddressList,
    },
  ],
})

export default router
