<template>
    <form class="register-form">
        <InputField
            v-model="formData.name"
            name="name"
            label="Full name"
            placeholder="Enter your full name"
        />
        <InputField
            v-model="formData.email"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
        />
        <InputField
            v-model="formData.password"
            name="email"
            label="Email"
            placeholder="Your email goes here"
        />
        <div class="login-form__wrap">
            <FormButton text="Sign Up" @clickHandler="clickHandler" :loader="loader" />
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
        },
        loader: false
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