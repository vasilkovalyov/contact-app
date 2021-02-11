<template>
    <section class="section-admin-default">
        <div class="container">
            <AdminSectionHeader>
                <template v-slot:title>Home Admin</template>
            </AdminSectionHeader>
        </div>
    </section>
</template>
<script>

import AdminSectionHeader from '@/components/AdminSectionHeader';


export default {
    name: 'HomeAdmin',
    
    async mounted() {
        await this.$store.dispatch('onAuthUser');
	},

    components: {
        AdminSectionHeader
    }
}
</script>

<style lang="scss">
    .section-home-admin {
        padding: 50px 0;
    }
</style>