<template>
    <div class="auth-form-wrapper">
        <form class="auth-form">
            <div class="auth-form__header">
                <h2>Login</h2>
                <p>Please login to access the Dashboard</p>
            </div>
            <InputField
                v-model="formData.email.value"
                :name="formData.email.name"
                :placeholder="formData.email.placeholder"
                :link="formData.email.link"
                :linkName="formData.email.linkName"
            >
                <template v-slot:input-icon>
                    <i class="fas fa-envelope"></i>
                </template>
                <template v-slot:label>Email</template>
            </InputField>
            <InputField
                v-model="formData.password.value"
                :name="formData.password.name"
                type="password"
                :placeholder="formData.password.placeholder"
                :link="formData.password.link"
                :linkName="formData.password.linkName"
            >
                <template v-slot:input-icon>
                    <i class="fas fa-lock"></i>
                </template>
                <template v-slot:label>Password</template>
            </InputField>
            <div class="auth-form__btn-wrap">
                <FormButton :buttonClass="['btn__primary', 'btn__wide']" @clickHandler="clickHandler" :loader="loader" >Login</FormButton>
                <p>New to our platform? <router-link to="/register">Create an account</router-link> </p>
            </div>
        </form>
    </div>
</template>

<script>

import InputField from '@/components/FormsComponents/InputField';
import FormButton from '@/components/FormsComponents/FormButton';

export default {
    name: 'Login',
    
    data() {
        return {
            formData: {
                email: {
                    value: '',
                    name: 'email',
                    placeholder: 'Email',
                    link: '#',
                    linkName: 'Need help?'
                },
                password: {
                    value: '',
                    name: 'password',
                    placeholder: 'Password',
                    link: '/reset-password',
                    linkName: 'Forgot Password?'
                }
            },
            loader: false
        }
    },

    components: {
        InputField,
        FormButton
    },

    methods: {
        async clickHandler() {
            const formData = {
                email: this.formData.email.value,
                password: this.formData.password.value,
            }

            try {
                this.loader = true;
                await this.$store.dispatch('signIn', formData);
                this.loader = false;
                this.$router.push('/');
            } catch(error) {

                console.log(error);
            }
        },
    }
}
</script>

<style lang="scss">
    
</style>