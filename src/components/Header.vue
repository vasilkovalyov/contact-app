<template>
    <header class="header">
        <div class="container">
            <router-link to="/admin" tag="a" class="header__logo">Quiz App</router-link>
            <nav class="header-nav">
                <template v-if="getAuthUserDate">
                    <UserProfileNav 
                        :user="getAuthUserDate"
                    />
                </template>
            </nav>
        </div>
    </header>
</template>

<script>

import { mapGetters } from 'vuex';

import UserProfileNav from './UserProfileNav';

export default {
    name: 'Header',

    data: () => ({

    }),

    computed: {
        ...mapGetters(['getAuthUserDate'])
    },

    components: {
        UserProfileNav
    },

   
}
</script>

<style lang="scss">
    .header {
        padding: 14px 0;
        color: #525F7F;
        background-color: #ffffff;

        &__logo {
            margin-right: 10px;
        }

        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .header-nav-list {
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        list-style-type: none;

        li {
            &:not(:first-child) {
                margin-left: 15px;
            }
        }

        a,
        button {
            transition: opacity 0.3s linear;

            &:hover {
                opacity: 0.7;
            }
        }
    }

    .btn-sign-out {
        background: transparent;
        border: none;
        color: #ffffff;
        font-size: 20px;
        cursor: pointer;
       
    }
</style>