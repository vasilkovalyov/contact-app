<template>
    <form class="login-form">
        <InputField
        v-model="formData.email"
            name="email"
            label="Email"
            placeholder="Your email goes here"
        />
        <InputField
        v-model="formData.password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
        />
        <div class="login-form__wrap">
            <FormButton text="Sign In" @clickHandler="clickHandler" :loader="loader" />
        </div>
    </form>
</template>
<script>

import InputField from '../FormsComponents/InputField';
import FormButton from '../FormsComponents/FormButton';


export default {
    data: () => ({
        formData: {
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
                email: this.formData.email,
                password: this.formData.password,
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