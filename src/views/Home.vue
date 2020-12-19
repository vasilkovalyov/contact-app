<template>
    <section class="section-users">
        <div class="container">
            <h1>List on Users</h1>
            <div class="section-users__head-configuration">
                <Search 
                    label="Search:"
                    @handleClickSearch="handleClickSearch"
                />
            </div>
            <TableUser :users="this.getUsers"  />
        </div>
    </section>
</template>

<script>

import MainLayout from '../layouts/MainLayout';

import Search from '../components/Search';
import TableUser from '../components/TableUsers';

import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        searchValue: '',
    }),

    components: {
        MainLayout,
        Search,
        TableUser
    },

    mounted() {

    },

    beforeMount() {
        this.loadUsers('users');
    },

    computed: {
        ...mapGetters(['getUsers']),
    },

    methods: {
        ...mapActions(['loadUsers']),
        handleClickSearch(value) {
            this.searchValue = value;
        } 
    }
}

</script>

<style lang="scss" scoped>
    .section-users {
        padding: 40px 0;

        &__head-configuration {
            margin-bottom: 20px;
        }

        h1 {
            font-weight: 500;
        }
    }
</style>