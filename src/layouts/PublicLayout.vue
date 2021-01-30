<template>
	<div class="wrapper-main">
        <template v-if="getAuthUserDate">
            <Adminbar :user="getAuthUserDate" />
        </template>
        <main class="main">
            <router-view />
        </main>
    </div>
</template>
<script>

import { mapGetters } from 'vuex';
import Adminbar from '@/components/AdminBar';
        

export default {
    name: 'PublicLayout',

    computed: {
        ...mapGetters(['getAuthUserDate']),
    },

    async mounted() {
        await this.$store.dispatch('onAuthUser');
        
    },

    components: {
        Adminbar
    }
}
</script>
<style lang="sass">
    
</style>