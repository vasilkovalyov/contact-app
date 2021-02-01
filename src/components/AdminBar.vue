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

<style lang="scss">
    .admin-bar {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: #1976d2;
        color: #ffffff;
        padding: 8px 0;
        z-index: 2;
        
        .container  {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .user {
            position: relative;
            display: flex;
            align-items: center;
            cursor: pointer;

            &:after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: -17px;
                height: 17px;
            }

            &:hover {
                .dropdown {
                    opacity: 1;
                    visibility: visible;
                }
            }

            &__image {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            &__name {
                font-size: 14px;
                margin-right: 10px;
            }
        }

        .dropdown {
            position: absolute;
            top: calc(100% + 18px);
            right: 0;
            background-color: #1976d2;
            width: 200px;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s linear, visibility 0.3s linear,;

            &__list {
                margin: 0;
                padding: 10px 5px;
            }

            &__item {
                list-style-type: none;
                
                &:not(:last-child) {
                    margin-bottom: 10px;
                }
                
                a {
                    display: flex;
                    align-items: center;
                    transition: opacity 0.3s linear;

                    &:hover {
                        opacity: 0.7;
                    }
                }

                .fas {
                    width: 30px;
                    text-align: center;
                    margin-right: 5px;
                }
            }
        }
    }
</style>