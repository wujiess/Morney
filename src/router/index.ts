import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Money from '@/views/Money.vue'
import Tags from '@/views/Tags.vue'
import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue'
import EditTag from '@/views/EditTag.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    component: Money
  }, {
    path: '/tags',
    component: Tags
  }, {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/tags/edit/:id',
    component: EditTag
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
