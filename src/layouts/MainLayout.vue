<template>
    <div class="wrapper-main">
        <Header />
        <router-view />
    </div>
</template>

<script>

import Header from '@/components/Header';


export default {
    components: {
        Header
    }
}
</script>

<style lang="scss">
    .wrapper-main {
        min-height: 100vh;
    }
</style>