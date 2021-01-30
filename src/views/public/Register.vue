<template>
    <div class="auth-form-wrapper">
        <form class="auth-form">
            <div class="auth-form__header">
                <h2>Register</h2>
                <p>Create a new account for My Contribution</p>
            </div>
            <InputField
                v-model="formData.firstName" name="first-name" placeholder="First Name" :hasIcon="true">
                <template v-slot:input-icon>
                    <i class="fas fa-user"></i>
                </template>
            </InputField>
            <InputField v-model="formData.lastName" name="last-name" placeholder="Last Name" :hasIcon="true">
                <template v-slot:input-icon>
                    <i class="fas fa-user"></i>
                </template>
            </InputField>
            <InputField v-model="formData.jobTitle" name="job" placeholder="Job Title" :hasIcon="true">
                <template v-slot:input-icon>
                    <i class="fas fa-user-md"></i>
                </template>
            </InputField>
            <InputField v-model="formData.email" name="email" placeholder="Email" :hasIcon="true">
                <template v-slot:input-icon>
                    <i class="fas fa-envelope"></i>
                </template>
            </InputField>
            <InputField v-model="formData.password" name="password" type="password" placeholder="Password" :hasIcon="true">
                <template v-slot:input-icon>
                        <i class="fas fa-lock"></i>
                </template>
            </InputField>
            <div class="auth-form__btn-wrap">
                <FormButton :buttonClass="['v-btn__primary', 'v-btn__wide']" @clickHandler="clickHandler" :loader="loader">Register</FormButton>
                <p>Do you have an account? <router-link tag="a" to="/login">Return to login</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>

import InputField from '@/components/FormsComponents/InputField';
import FormButton from '@/components/FormsComponents/FormButton';

export default {
    name: 'Register',
    
    data() {
        return {
            formData: {
                firstName: '',
                lastName: '',
                jobTitle: '',
                email: '',
                password: '',
                image: ''
            },
            loader: false
        }
    },

    components: {
        InputField,
        FormButton,
    },

    methods: {
        async clickHandler() {
            const formData = {
                firstName: this.formData.firstName,
                lastName: this.formData.lastName,
                jobTitle: this.formData.jobTitle,
                email: this.formData.email,
                password: this.formData.password,
                image: this.formData.image
            }

            try {
                this.loader = true;
                await this.$store.dispatch('signUp', formData);
                this.loader = false;
                this.$router.push('/admin');
            } catch(error) {
                console.log(error);
            }
        },
    }
}
</script>

<style lang="scss">
    
</style>