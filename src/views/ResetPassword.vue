<template>
    <div class="auth-form-wrapper">
        <form class="auth-form">
            <div class="auth-form__header">
                <h2>Reset Password</h2>
                <p>If your have forgotten your password, we can email instructions on how to reset it.</p>
            </div>
            <input-field
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
            </input-field>
            <div class="auth-form__btn-wrap">
                <form-button @clickHandler="clickHandler" :loader="loader" >Send Instructions</form-button>
                <p><router-link tag="a" to="/login">Return to login</router-link></p>
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
            email: {
                value: '',
                name: 'email',
                placeholder: 'Email',
                link: '#',
                linkName: 'Need help?'
            },
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