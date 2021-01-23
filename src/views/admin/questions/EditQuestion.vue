<template>
    <div class="edit-questions-page">
        <section class="section-edit-questions">
            <div class="container">
                <h1>Edit Questions</h1>
                <div class="quiz-panel">
                    <form class="form-create-quiz">
                        <!-- <FormSelect 
                            name="game-select" 
                            baseOption="Select quiz" 
                            :options="getQuestionsForSelect"
                            @onChange="onChangeSelect"
                        >
                            <template v-slot:label>Choose Quiz</template>
                        </FormSelect> -->
                        <InputField 
                            v-model="formData.question"
                            name="questions-name" 
                            placeholder="Input questions name" 
                        >
                            <template v-slot:label>Questions name</template>
                        </InputField>
                        <template v-if="loading">
                            
                            <FieldOptions
                                caption="Options"
                                :data="formData.questionsArray"
                                :answer="formData.trueAnswer"
                                :countOptions="countOptions"
                                @handleChangeOptions="handleChangeOptions"
                            />
                        </template>
                        <FormButton :buttonClass="['btn__primary']" @clickHandler="formSubmit" :loader="loader">Save Question</FormButton>
                        <router-link to="/admin/quiz-questions" tag="a" class="btn btn__primary">Back</router-link>
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

import InputField from '@/components/FormsComponents/InputField';
import FormSelect from '@/components/FormsComponents/FormSelect';
import TextAreaField from '@/components/FormsComponents/TextAreaField';
import FormButton from '@/components/FormsComponents/FormButton';
import FieldOptions from '@/components/FormsComponents/FieldOptions';
import Notification from '@/components/Notification';

export default {
    name: 'EditQuestion',

    data() {
        return {
            games: [],
            formData: {
                game: {
                    'code': '',
                    'label': ''
                },
                question: '',
                questionsArray: [],
                trueAnswer: null,
            },
            countOptions: 4,
            loader: false,
            isShowNotification: false,
            notification: {
                message: '',
                type: ''
            },
            loading: false,
        }
    },

    async mounted() {
        try {
            const response = firebase.getFromCollectionPost('games', 'questions' , {
                keyPost: this.$route.params.game,
                keyCollectionPost: this.$route.params.question,
            });

            response.then(data => {
                this.formData = data;
                if(data) this.loading = true;

            })
        } catch(e) {
            console.log(e.message);
        }
    },

    computed: {
        getQuestionsForSelect() {
            return this.getQuizGames.map((item) => ({
                'code': item.key,
                'label': item.name
            }));
        }
    },

    methods: {
        async formSubmit() {
            try {
                const dataObject = {
                    key: this.$route.params.game, 
                    data: {
                        ...this.formData,
                        questionsArray: [...this.formData.questionsArray],
                        question: this.formData.question,
                        trueAnswer: this.formData.trueAnswer
                    }
                }

                await firebase.setPostInTheCollection('games', 'questions', {
                    dataPost: {...dataObject},
                    keyPost: this.$route.params.game,
                    keyCollectionPost: this.$route.params.question,
                });
                this.initNotification(true);
            } catch(e) {
                this.initNotification(false);
                console.log(e);
            }
        },

        onChangeSelect(selectData) {
            this.formData.game = {...selectData}
        },

        handleChangeOptions(data) {
            this.formData.questionsArray = data.options;
            this.formData.trueAnswer = data.trueAnswer;
        },

        closeNotification() {
            this.isShowNotification = false;
        },

        initNotification(flag) {
            this.isShowNotification = true;

            if(flag) {
                this.notification.message = 'Quiz Question Create - Successfull',
                this.notification.type = 'successfull'
            } else {
                this.notification.message = 'Quiz Question Create - Error',
                this.notification.type = 'error'
            }
        },
    },

    components: {
        InputField,
        FormSelect,
        TextAreaField,
        FormButton,
        FieldOptions,
        Notification
    }
}

</script>
<style lang="scss">
    .section-edit-questions {
        padding: 50px 0;
    }

    .form-create-quiz {
        padding: 50px;
    }
</style>