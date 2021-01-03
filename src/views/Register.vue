<template>
    <div class="auth-form-wrapper">
        <form class="auth-form">
            <div class="auth-form__header">
                <h2>Register</h2>
                <p>Create a new account for My Contribution</p>
            </div>
            <input-field
                v-model="formData.firstName" name="first-name" placeholder="First Name">
                <template v-slot:input-icon>
                    <i class="fas fa-user"></i>
                </template>
            </input-field>
            <input-field v-model="formData.lastName" name="last-name" placeholder="Last Name">
                <template v-slot:input-icon>
                    <i class="fas fa-user"></i>
                </template>
            </input-field>
            <input-field v-model="formData.jobTitle" name="job" placeholder="Job Title">
                <template v-slot:input-icon>
                    <i class="fas fa-user-md"></i>
                </template>
            </input-field>
            <input-field v-model="formData.email" name="email" placeholder="Email">
                <template v-slot:input-icon>
                    <i class="fas fa-envelope"></i>
                </template>
            </input-field>
            <input-field v-model="formData.password" name="password" type="password" placeholder="Password">
                <template v-slot:input-icon>
                        <i class="fas fa-lock"></i>
                </template>
            </input-field>
            <div class="auth-form__btn-wrap">
                <form-button @clickHandler="clickHandler" :loader="loader">Register</form-button>
                <p>Do you have an account? <router-link tag="a" to="/login">Return to login</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>

import InputField from '@/components/FormsComponents/InputField';
import FormButton from '@/components/FormsComponents/FormButton';

export default {
    data: () => ({
        formData: {
            firstName: '',
            lastName: '',
            jobTitle: '',
            email: '',
            password: ''
        },
        loader: false
    }),

    components: {
        InputField,
        FormButton,
    },

    methods: {
        async clickHandler() {
            const formData = {
                name: this.formData.name,
                email: this.formData.email,
                password: this.formData.password,
            }

            try {
                this.loader = true;
                await this.$store.dispatch('signUp', formData);
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