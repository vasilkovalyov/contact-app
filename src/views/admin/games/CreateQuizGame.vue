<template>
    <section class="section-admin-default">
        <div class="container">
            <AdminSectionHeader>
                <template v-slot:title>Create Quiz Game</template>
            </AdminSectionHeader>
            <div class="section-admin-default__body">
                <form class="form-admin-game">
                    <InputField 
                        v-model="formData.name"
                        name="quiz-name" 
                        placeholder="Input quiz name" 
                    >
                        <template v-slot:label>Quiz name</template>
                    </InputField>
                    <TextAreaField
                        v-model="formData.description"
                        name="quiz-description"
                        placeholder="Input quiz description" 
                    >
                        <template v-slot:label>Quiz description</template>
                    </TextAreaField>
                    <InputField 
                        v-model="formData.time"
                        name="quiz-time" 
                        placeholder="Input quiz time" 
                    >
                        <template v-slot:label>Time (in minute)</template>
                    </InputField>
                    <FormButton :buttonClass="['v-btn__primary']" @clickHandler="handleClickSave" :loader="loader">Create Quiz</FormButton>
                </form>
            </div>
        </div>
        <template v-if="isShowNotification">
            <Notification
                :message="notification.message"
                :type="notification.type"
                :timeout="2000"
                @closeNotification="closeNotification"
            />
        </template>
    </section>
</template>
<script>

import { mapActions } from 'vuex';

import { clearFormObject } from '@/helpers';

import InputField from '@/components/FormsComponents/InputField';
import TextAreaField from '@/components/FormsComponents/TextAreaField';
import FormButton from '@/components/FormsComponents/FormButton';
import Notification from '@/components/Notification';
import AdminSectionHeader from '@/components/AdminSectionHeader';

export default {
    name: 'CreateQuizGame',

    data() {
        return {
            loader: false,
            isShowNotification: false,
            formData: {
                name: '',
                description: '',
                time: '',
            },
            notification: {
                message: '',
                type: ''
            },
        }
    },

    methods: {
        ...mapActions(['onCreateGame']),

       
        async handleClickSave() {
            const formData = {...this.formData};
            try {
                await this.onCreateGame(formData);
                this.initNotification(true);
                clearFormObject(this.formData);
            } catch(e) {
                this.initNotification(false);
                console.log(e);
            }
        },

        closeNotification() {
            this.isShowNotification = false;
        },

        initNotification(flag) {
            this.isShowNotification = true;

            if(flag) {
                this.notification.message = 'Quiz Game Create Successfull',
                this.notification.type = 'successfull'
            } else {
                this.notification.message = 'Quiz Game Create Error',
                this.notification.type = 'error'
            }
        },
    },
    
    components: {
        Notification,
        InputField,
        TextAreaField,
        FormButton,
        AdminSectionHeader
    }
}
</script>