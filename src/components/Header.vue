<template>
    <header class="header">
        <div class="container">
            <router-link to="/" tag="a" class="header__logo">Vue Contact App</router-link>

            <nav class="header-nav">
                <ul class="header-nav-list">
                    <li>
                        <router-link to="create">Create</router-link>
                    </li>
                    <li>
                        <button @click.prevent="signOut" class="btn-sign-out">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </li>
                </ul>
            </nav>
            
        </div>
    </header>
</template>

<script>

export default {
    data: () => ({

    }),

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

<style lang="scss" scoped>
    .header {
        padding: 14px 0;
        color: #ffffff;
        background-color: #2196f3;


        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .header-nav-list {
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