<template>
    <form class="login-form">
        <InputField
            name="email"
            label="Email"
            placeholder="Your email goes here"
            @inputHandler="(value) => inputHandler('email', value)"

        />
        <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            @inputHandler="(value) => inputHandler('password', value)"

        />
        <div class="login-form__wrap">
            <FormButton text="Sign In" @clickHandler="clickHandler" />
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
        }
    }),

    components: {
        InputField,
        FormButton
    },

    methods: {
        clickHandler() {
            
        },

        inputHandler(type, value) {
            this.formData[type] = value;
        }
    }
}
</script>