<template>
    <section class="section-admin-default">
        <div class="container">
            <AdminSectionHeader>
                <template v-slot:title>Search Users</template>
                <template v-slot:search>
                    <div class="search-wrap">
                        <Search 
                            placeholder="Search Users"
                            @handleClickSearch="handleClickSearch"
                        />
                    </div>
                </template>
            </AdminSectionHeader>
            <div class="section-admin-default__body">
                <TableUser :users="this.getUsers"  />
            </div>
        </div>
    </section>
</template>

<script>

import Search from '@/components/Search';
import TableUser from '@/components/TableUsers';
import AdminSectionHeader from '@/components/AdminSectionHeader';

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Home',
    
    data () {
        return {
            searchValue: '',
        }
    },

    components: {
        Search,
        TableUser,
        AdminSectionHeader
    },

    mounted() {
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