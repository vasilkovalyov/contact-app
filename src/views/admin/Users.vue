<template>
    <section class="section-users">
        <div class="container">
            <div class="section-users__header">
                <div class="df-row">
                    <div class="col col-6">
                        <h1>Users</h1>
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

import Search from '@/components/Search';
import TableUser from '@/components/TableUsers';

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
        TableUser
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

<style lang="scss">
    .section-users {
        padding: 40px 0;

        &__head-configuration {
            margin-bottom: 20px;
        }

        h1 {
            font-weight: 500;
            margin: 0 20px 0 0;
            color: #525F7F;
        }

        &__header {
            margin-bottom: 40px;

            .df-row {
                display: flex;
                align-items: center;

                .col {
                    &.col-6 {
                        width: 50%;
                    }
                }
            }
        }

        .search-wrap {
            display: flex;
            justify-content: flex-end;
        }

        &__panel {
            background-color: #fff;
            box-shadow: 0 0 11px 1px rgba(0,0,0,0.2);
        }
    }
</style>