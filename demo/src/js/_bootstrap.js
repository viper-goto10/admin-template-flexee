import '../scss/demo.scss';
import { Collapse, Dropdown } from 'bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: {
            isLoggedIn: false
        }
    },
    mutations: {
        userIsLoggedIn(state, val) {
            state.user.isLoggedIn = val;
        }
    }
})

import Layout from '../vue/layout.vue'
import Dashboard from '../vue/pages/dashboard.vue'
import SignIn from '../vue/pages/sign-in.vue'
import Parent from '../vue/pages/parent.vue'
import Child from '../vue/pages/child.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/dashboard'},
        { path: '/dashboard', component: Dashboard },
        { path: '/sign-in', component: SignIn, name: 'signIn' },
        { path: '/parent', component: Parent },
        { path: '/parent/child', component: Child }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name === 'signIn') {
        store.commit('userIsLoggedIn', false);
    } else {
        store.commit('userIsLoggedIn', true);
    }
    next();
});

const app = createApp(Layout)
app.use(router)
app.use(store)
app.mount('#app')