<template>
    <div class="login-form-wrapper">
        <RegisterForm />
    </div>
</template>

<script>

import RegisterForm from '@/components/Forms/RegisterForm';

export default {
    data: () => ({

    }),

    components: {
        RegisterForm
    }
}
</script>

<style lang="scss">
    // .login-form-wrapper {
    //     padding: 40px;
    //     color: #ffffff;
    // }
</style>