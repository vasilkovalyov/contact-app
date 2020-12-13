<template>
    <div class="login-form-wrapper">
        <LoginForm />
    </div>
</template>

<script>

import LoginForm from '@/components/Forms/LoginForm';

export default {
    data: () => ({

    }),

    components: {
        LoginForm
    }
}
</script>

<style lang="scss">
    // .login-form-wrapper {
    //     padding: 40px;
    //     color: #ffffff;
    // }
</style>