<template>
    <header class="header" :class="menuIsOpen ? 'header-nav-active' : '' ">
        <div class="container">
            <div class="header-user-profile">
                <template v-if="getAuthUserDate">
                    <UserProfileNav 
                        :user="getAuthUserDate"
                    />
                </template>
            </div>
        </div>
        <nav class="header-nav">
            <div class="header-nav__primary">
                <button class="hamburger" @click="onOpenMenu">
                    <span class="hamburger__box">
                        <span class="hamburger__inner"></span>
                    </span>
                </button>
                <HeaderNavList 
                    :navListPrimary="navListPrimary"
                    :isTextVisible="false"
                />
            </div>
            <div class="header-nav__secondary">
                <div class="header-nav__header">
                    <router-link to="/admin" tag="a" class="header-nav__logo">
                        <img src="/images/quiz-1.png" alt="quiz-logo">
                    </router-link>
                    <button class="hamburger" @click="onCloseMenu">
                        <span class="hamburger__box">
                            <span class="hamburger__inner"></span>
                        </span>
                    </button>
                </div>
                <div class="header-nav__body">
                    <HeaderNavList 
                        :navListPrimary="navListPrimary"
                        :navListSecondary="navListSecondary"
                        :isSecondaryListVisible="true"
                    />
                </div>
            </div>
        </nav>
    </header>
</template>

<script>

import { mapGetters } from 'vuex';

import UserProfileNav from './UserProfileNav';
import HeaderNavList from '../components/HeaderComponents/HeaderNavList';

export default {
    name: 'Header',

    data() {
        return {
            menuIsOpen: false,
            navListPrimary: [
                {
                    link: '/admin',
                    icon: 'fa-tachometer-alt',
                    text: 'Dashboard'
                },
                {
                    link: '/admin/admin-profile',
                    icon: 'fa-user-cog',
                    text: 'View Profile'
                },
                {
                    link: '/admin/users',
                    icon: 'fa-users',
                    text: 'View Users'
                },
                {
                    link: '/admin/quiz-games',
                    icon: 'fa-puzzle-piece',
                    text: 'View Games'
                },
                {
                    link: '/admin/quiz-questions',
                    icon: 'fa-clipboard-list',
                    text: 'View Questions'
                },
            ],
            navListSecondary: [
                {
                    link: '/admin/create-quiz-game',
                    icon: 'fa-puzzle-piece',
                    text: 'Create Game'
                },
                {
                    link: '/admin/create-quiz-questions',
                    icon: 'fa-clipboard-list',
                    text: 'Create Question'
                },
            ]
        }
    },

    computed: {
        ...mapGetters(['getAuthUserDate'])
    },

    methods: {
        onOpenMenu() {
            this.menuIsOpen = true;
        },
        
        onCloseMenu() {
            this.menuIsOpen = false;
        },

    },


    components: {
        UserProfileNav,
        HeaderNavList
    },
}
</script>