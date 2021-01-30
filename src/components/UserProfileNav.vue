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
                        <span>{{navItem.name}}</span>
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
                    name: 'Home page',
                },
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
                    link: '/admin/create-quiz-game',
                    icon: 'fa-gamepad',
                    name: 'Create quiz game',
                },
                {
                    link: '/admin/create-quiz-questions',
                    icon: 'fa-gamepad',
                    name: 'Create quiz questions',
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

<style lang="scss">
    .user-profile-nav {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
            .user-profile-nav__dropdown {
                opacity: 1;
                visibility: visible;
            }
        }

        &__image {
            width: 35px;
            min-width: 35px;
            height: 35px;
            overflow: hidden;
            display: flex;
            margin-right: 15px;
            border-radius: 50%;
        }

        &__info {
            font-size: 14px;
        }

        &__dropdown {
            transition: opacity .3s ease-in-out, visibility .3s ease-in-out;
            position: absolute;
            top: calc(100% + 15px);
            border-top: 3px solid #4b9da5;
            background-color: #fff;
            z-index: 10;
            opacity: 0;
            visibility: hidden;
            right: 0;
            width: 200px;
            font-size: 14px;
            right: 50%;
            transform: translateX(77%);

            ul {
                list-style-type: none;
                padding: 0;
                margin: 0;

                li {
                    padding: 15px 20px 15px 16px;

                    i {
                        margin-right: 10px;
                    }
                    
                    a {
                        display: flex;
                        align-items: center;
                        color: inherit;
                        transition: color 0.3s linear;

                        &:hover {
                            color: #4b9da5;
                        }
                    }
                }
            }
        }
        
    }
</style>