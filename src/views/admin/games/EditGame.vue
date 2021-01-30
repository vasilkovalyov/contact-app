<template>
    <div class="edit-game-page">
        <section class="section-edit-game">
            <div class="container">
                <h1>Edit Game</h1>
                <div class="quiz-panel">
                    <form class="form-create-quiz">
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
                        <FormButton :buttonClass="['v-btn__primary']" @clickHandler="handleClickSave" :loader="loader">Save Quiz</FormButton>
                        <router-link to="/admin/quiz-games" tag="a" class="v-btn v-btn__primary">Back</router-link>
                    </form>
                </div>
            </div>
        </section>
        <template v-if="isShowNotification">
            <Notification
                :message="notification.message"
                :type="notification.type"
                :timeout="2000"
                @closeNotification="closeNotification"
            />
        </template>
    </div>
</template>

<script>

import firebase from '@/firebase';

import { mapActions } from 'vuex';

import InputField from '@/components/FormsComponents/InputField';
import TextAreaField from '@/components/FormsComponents/TextAreaField';
import FormButton from '@/components/FormsComponents/FormButton';
import Notification from '@/components/Notification';

export default {
    name: 'EditGame',

    data() {
        return {
            loader: false,
            isShowNotification: false,
            formData: {
                name: '',
                description: '',
                time: '',
                key: ''
            },
            notification: {
                message: '',
                type: ''
            },
        }
    },

    async mounted() {
        const key = this.$route.params.id;

        const post = await firebase.getPostById('games', key);
        this.formData = {...post, key };
    },

    methods: {
        ...mapActions(['onCreateGame']),

        async handleClickSave() {
            const formData = {...this.formData};
            try {
                await firebase.savePost('games', {
                    key: formData.key,
                    post: { ...formData },
                });
                this.initNotification(true);
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
                this.notification.message = 'Quiz Game Save Successfull',
                this.notification.type = 'successfull'
            } else {
                this.notification.message = 'Quiz Game Save Error',
                this.notification.type = 'error'
            }
        },
    },

    components: {
        Notification,
        InputField,
        TextAreaField,
        FormButton,
    }
}

</script>
<style lang="scss">
    @import '../../../scss/main.scss';

    .section-edit-game {
        padding: 50px 0;

        .form-create-quiz {
            padding: 50px;
        }

        h1 {
            color: $blue-dark-1;
        }
    }
</style>