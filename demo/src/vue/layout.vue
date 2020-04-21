<template>
    <div class="wrapper" :class="[{'sidebar-collapsed' : isSidebarCollapsed}, isSidebarEntire ? 'sidebar-entire' : 'sidebar-compressed']">
        <nav class="navbar navbar-expand navbar-light bg-light">
            <div class="sidebar-nav-row">
                <span class="sidebar-nav-icon sidebar-toggle" v-on:click="toggleSidebarVisibility()" v-if="$store.state.user.isLoggedIn">
                    <span class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </span>
                <router-link class="navbar-brand" to="/sign-in">Flexee</router-link>
            </div>
            <ul class="navbar-nav ml-auto" v-if="$store.state.user.isLoggedIn">
                <li class="nav-item dropdown">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >My username</a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <span class="dropdown-item" href="#"><i>Action</i></span>
                        <span class="dropdown-item" href="#"><i>Another action</i></span>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" v-on:click.prevent="logOut()" href="#">Log out</a>
                    </div>
                </li>
            </ul>
        </nav>
        <div class="content">
            <aside class="sidebar" v-if="$store.state.user.isLoggedIn">
                <div class="sidebar-header">
                    <div class="sidebar-nav-row">
                        <span class="sidebar-nav-icon">
                            <i class="icon-question-circle-o"></i>
                        </span>
                        <span class="sidebar-nav-text">header</span>
                    </div>
                </div>
                <div class="sidebar-body vertical-scroll custom-scrollbar">
                    <nav class="sidebar-nav">
                        <div
                            class="sidebar-nav-group"
                            :class="{'active': subIsActive('/dashboard')}"
                        >
                            <router-link class="sidebar-nav-row sidebar-nav-item" to="/dashboard">
                                <span class="sidebar-nav-icon">
                                    <i class="icon-home"></i>
                                </span>
                                <span class="sidebar-nav-text">Dashboard</span>
                            </router-link>
                        </div>
                        <div
                            class="sidebar-nav-group"
                            :class="{'active': subIsActive('/parent')}"
                        >
                            <router-link class="sidebar-nav-row sidebar-nav-item" to="/parent">
                                <span class="sidebar-nav-icon">
                                    <i class="icon-chart-area"></i>
                                </span>
                                <span class="sidebar-nav-text">Parent sample</span>
                            </router-link>
                            <router-link
                                class="sidebar-nav-row sidebar-nav-subitem"
                                to="/parent/child"
                            >
                                <span class="sidebar-nav-icon">
                                    <i class="icon-chart-bar"></i>
                                </span>
                                <span class="sidebar-nav-text">Child sample</span>
                            </router-link>
                        </div>
                    </nav>
                </div>
                <div class="sidebar-footer">
                    <div class="sidebar-nav-row">
                        <span class="sidebar-nav-icon">
                            <i class="icon-info"></i>
                        </span>
                        <span class="sidebar-nav-text">footer</span>
                        <button class="sidebar-nav-icon ml-auto visible-entire" v-on:click="toggleSidebarWidth()">
                            <i class="icon-angle-double-left"></i>
                        </button>
                    </div>
                    <div class="sidebar-nav-row visible-compressed">
                        <button class="sidebar-nav-icon" v-on:click="toggleSidebarWidth()">
                            <i class="icon-angle-double-right"></i>
                        </button>
                    </div>
                </div>
            </aside>
            <div class="frame" :class="{ 'justify-content-center': !$store.state.user.isLoggedIn }">
                <div id="frame-scrollable" class="container-fluid vertical-scroll">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FlexeeHelper from '../../../src/js/helper';

export default {
    mixins: [FlexeeHelper],
    methods: {
        logOut() {
            this.$router.push('sign-in');
        }
    }
};
</script>