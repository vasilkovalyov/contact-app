<template>
    <header class="header">
        <div class="container">
            <h1>Header</h1>
            <button @click.prevent="signOut">Sign out</button>
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