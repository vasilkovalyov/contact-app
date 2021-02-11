<template>
    <div class="wrapper-main admin">
        <Header />
        <main class="main">
            <router-view />
        </main>
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
        display: flex;
        flex-direction: column;

        .main {
            flex: 1;
        }

        &.admin {
            padding-left: 63px;
        }
    }
</style>