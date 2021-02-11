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

    computed: {
        ...mapGetters(['getAuthUserDate'])
    },

    components: {
        UserProfileNav
    },
}
</script>