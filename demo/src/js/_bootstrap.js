import '../scss/demo.scss';
import { dropdown, collapse } from 'bootstrap';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
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

var $ = require("jquery");

import Layout from '../vue/layout.vue'
import Dashboard from '../vue/pages/dashboard.vue'
import SignIn from '../vue/pages/sign-in.vue'
import Parent from '../vue/pages/parent.vue'
import Child from '../vue/pages/child.vue'

const router = new VueRouter({
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

Vue.use(VueRouter);

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Layout, {
        params: {}
    })
})