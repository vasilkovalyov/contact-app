<template>
    <section class="section-users">
        <div class="container">
            <div class="section-users__header">
                <div class="df-row">
                    <div class="col col-6">
                        <div class="section-users-caption">
                            <h1>Users</h1>
                        </div>
                    </div>
                    <div class="col col-6">
                        <div class="search-wrap">
                            <Search 
                                placeholder="Search Users"
                                @handleClickSearch="handleClickSearch"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-users__panel">
                <TableUser :users="this.getUsers"  />
            </div>
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

        &__panel {
            background-color: #fff;
            box-shadow: 0 0 11px 1px rgba(0,0,0,0.2);
        }
    }
</style>