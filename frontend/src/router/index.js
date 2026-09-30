import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Books from '../views/Books.vue'
import BookDetail from '../views/BookDetail.vue'
import Contact from '../views/Contact.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Lizi Mulambo - Coach e Autora'
    }
  },
  {
    path: '/sobre',
    name: 'About',
    component: About,
    meta: {
      title: 'Sobre Lizi Mulambo'
    }
  },
  {
    path: '/livros',
    name: 'Books',
    component: Books,
    meta: {
      title: 'Livros - Lizi Mulambo'
    }
  },
  {
    path: '/livro/:slug',
    name: 'BookDetail',
    component: BookDetail,
    meta: {
      title: 'Livro - Lizi Mulambo'
    }
  },
  {
    path: '/contactos',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contactos - Lizi Mulambo'
    }
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: {
      title: 'Login - Administração'
    }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      title: 'Painel Administrativo'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Lizi Mulambo'
  next()
})

export default router
