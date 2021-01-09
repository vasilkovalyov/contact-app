<template>
    <div class="auth-form-wrapper">
        <form class="auth-form">
            <div class="auth-form__header">
                <h2>Reset Password</h2>
                <p>If your have forgotten your password, we can email instructions on how to reset it.</p>
            </div>
            <InputField
                v-model="formData.email.value"
                :name="formData.email.name"
                :placeholder="formData.email.placeholder"
                :link="formData.email.link"
                :linkName="formData.email.linkName"
                :hasIcon="true"
            >
                <template v-slot:input-icon>
                    <i class="fas fa-envelope"></i>
                </template>
                <template v-slot:label>Email</template>
            </InputField>
            <div class="auth-form__btn-wrap">
                <FormButton :buttonClass="['btn__primary', 'btn__wide']" @clickHandler="clickHandler" :loader="loader" >Send Instructions</FormButton>
                <p><router-link tag="a" to="/login">Return to login</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>

import InputField from '@/components/FormsComponents/InputField';
import FormButton from '@/components/FormsComponents/FormButton';

export default {
    name: 'ResetPassword',
    
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
            }

            try {
                this.loader = true;
                this.loader = false;
            } catch(error) {
                console.log(error);
            }
        },
    }
}
</script>

<style lang="scss">
    
</style>