<template>
    <div class="user-profile-nav">
        <div class="user-profile-nav__image">
            <img :src="user.image" alt="" v-if="user.image">
            <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="" v-else>
        </div>
        <div class="user-profile-nav__info">
            <span class="user-profile-nav__name">{{user.firstName}} {{user.lastName}}</span>
        </div>
        <div class="user-profile-nav__dropdown">
            <ul>
                <li v-for="(navItem, i) in navList" :key="i">
                    <router-link :to="navItem.link">
                        <i class="fas" :class="navItem.icon"></i>
                        <span>{{navItem.text}}</span>
                    </router-link>
                </li>
                <li>
                    <a href="#" @click.prevent="signOut">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sign out</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'UserProfileNav',

    props: ['user'],

    data() {
        return {
            navList: [
                {
                    link: '/',
                    icon: 'fa-home',
                    text: 'Home page',
                },
                {
                    link: '/admin/admin-profile',
                    icon: 'fa-user-cog',
                    text: 'Admin profile',
                },
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