<template>
    <section class="section-users">
        <div class="container">
            <h1>List on Users</h1>
            <Search 
                label="Search:"
                @handleClickSearch="handleClickSearch"
            />
        </div>
    </section>
</template>

<script>

import MainLayout from '../layouts/MainLayout';

import Search from '../components/Search';

export default {
    data: () => ({
        searchValue: ''
    }),

    components: {
        MainLayout,
        Search
    },

    methods: {
        handleClickSearch(value) {
            this.searchValue = value;
        } 
    }
}

</script>

<style lang="scss" scoped>
    .section-users {
        padding: 40px 0;

        h1 {
            font-weight: 500;
        }
    }
</style>