<template>
    <header class="header">
        <div class="container">
            <div class="header__logo">Vue Contact App</div>

            <nav class="header-nav">
                <ul class="header-nav-list">
                    <li>
                        <button @click.prevent="signOut">Sign out</button>
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
        list-style-type: none;
    }
</style>