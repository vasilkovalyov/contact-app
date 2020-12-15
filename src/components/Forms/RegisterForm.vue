<template>
    <form class="register-form">
        <InputField
            name="name"
            label="Full name"
            placeholder="Enter your full name"
            @inputHandler="(value) => inputHandler('name', value)"
        />
        <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            @inputHandler="(value) => inputHandler('password', value)"
        />
        <InputField
            name="email"
            label="Email"
            placeholder="Your email goes here"
            @inputHandler="(value) => inputHandler('email', value)"
        />
        <div class="login-form__wrap">
            <FormButton text="Sign Up" @clickHandler="clickHandler" />
        </div>
    </form>
</template>
<script>

import InputField from '../FormsComponents/InputField';
import FormButton from '../FormsComponents/FormButton';

export default {
    data: () => ({
        formData: {
            name: '',
            email: '',
            password: ''
        }
    }),

    components: {
        InputField,
        FormButton
    },

    methods: {
        async clickHandler() {
            const formData = {
                name: this.formData.name,
                email: this.formData.email,
                password: this.formData.password,
            }

            try {
                await this.$store.dispatch('signUp', formData);
                this.$router.push('/');
            } catch(error) {
                console.log(error);
            }
        },

        inputHandler(type, value) {
            this.formData[type] = value;
        }
    }
}
</script>