<template>
    <div class="admin-bar">
        <div class="container">
            <router-link to='/admin'>QUIZ</router-link>
            <div class="user">
                <span class="user__name">Hello, {{user.firstName}}</span>
                <div class="user__image">
                    <img :src="user.image" :alt="user.firstName">
                </div>

                <div class="dropdown">
                    <ul class="dropdown__list">
                        <li class="dropdown__item" v-for="(navItem, i) in navList" :key="i">
                            <router-link :to="navItem.link">
                                <i class="fas" :class="navItem.icon"></i>
                                <span>{{navItem.name}}</span>
                            </router-link>
                        </li>
                        <li class="dropdown__item">
                            <a href="#" @click.prevent="signOut">
                                <i class="fas fa-sign-out-alt"></i>
                                <span>Sign out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AdminBar',
        props: ['user'],

        data() {
            return {
                navList: [
                    {
                        link: '/admin/admin-profile',
                        icon: 'fa-user-cog',
                        name: 'Admin profile',
                    },
                    {
                        link: '/admin/users',
                        icon: 'fa-users',
                        name: 'Users',
                    },
                    {
                        link: '/admin/quiz-games',
                        icon: 'fa-gamepad',
                        name: 'All quiz games',
                    },
                    {
                        link: '/admin/quiz-questions',
                        icon: 'fa-gamepad',
                        name: 'All quiz questions',
                    }
                ]
            }
        },

        methods: {
            async signOut() {
                try {
                    await this.$store.dispatch('signOut')
                    this.$router.push('/login');
                } catch(e) {}
            }
        }
    }
</script>