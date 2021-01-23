<template>
    <section class="section-home-admin">
        <div class="container">
            <h1>Home Admin</h1>
        </div>
    </section>
</template>
<script>


export default {
    name: 'HomeAdmin',
    
    async mounted() {
        await this.$store.dispatch('onAuthUser');
	},
}
</script>

<style lang="scss">
    .section-home-admin {
        padding: 50px 0;
    }
</style>