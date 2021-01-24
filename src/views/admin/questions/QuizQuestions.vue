<template>
    <section class="section-quiz-questions">
        <div class="container">
            <h1>Quiz Questions</h1>

            <div class="quiz-panel">
                <table class="table">
                    <thead class="table__header">
                        <tr>
                            <td>#</td>
                            <td>Question</td>
                            <td>Quiz</td>
                            <td>Created</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <template v-if="isLoadData === true || questions.length > 0">
                        <tbody class="table__body">
                            <tr v-for="(item, i) in getQuestions" :key="getQuestionKey(i)">
                                <td>{{i+1}}</td>
                                <td>{{item.question}}</td>
                                <td>{{item.game.label}}</td>
                                <td>{{item.dateCreated}}</td>
                                <td colspan="3">
                                    <router-link 
                                        :to="{ path: `/admin/edit-question/game/${item.game.code}/question/${getQuestionKey(i)}`}"
                                        class="btn btn__secondary">Edit</router-link>
                                    <FormButton :buttonClass="['btn__third']" @clickHandler="removeHandler({
                                        keyPost: item.game.code,
                                        keyCollectionPost: getQuestionKey(i)
                                    })">Delete</FormButton>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                    <template v-else>
                        <tbody>
                            <tr>
                                <td colspan="6">
                                    <span>Games not a found</span>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </table>
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

import firebase from '@/firebase';
import FormButton from '@/components/FormsComponents/FormButton';
import Notification from '@/components/Notification';

export default {
    name: 'QuizQuestions',

    data() {
        return {
            questions: [],
            isLoadData: false,
            loaderBtnDelete: false,
            isShowNotification: false,
            notification: {
                message: '',
                type: ''
            },
        }
    },

    async mounted() {
        let newArrayPosts = {};

        const posts = await firebase.loadPosts('games');

        await posts.forEach((post) => {
            newArrayPosts = Object.assign(newArrayPosts, post.questions);
        })

        this.questions = await newArrayPosts;
        this.isLoadData = true;
    },

    methods: {
        async removeHandler(payload) {
            
            try {
                this.loaderBtnDelete = true;
                await firebase.removePostFromTheCollection('games', 'questions', payload);
                delete this.questions[payload.keyCollectionPost];
                this.questions = {...this.questions}
                this.initNotification(true);
                this.loaderBtnDelete = false;
            } catch(e) {
                console.log(e);
                this.initNotification(false);
                this.loaderBtnDelete = false;
            }
        },

        closeNotification() {
            this.isShowNotification = false;
        },

        initNotification(flag) {
            this.isShowNotification = true;

            if(flag) {
                this.notification.message = 'Quiz Question Remove - Successfull',
                this.notification.type = 'successfull'
            } else {
                this.notification.message = 'Quiz Question Remove - Error',
                this.notification.type = 'error'
            }
        },

        getQuestionKey(key) {
            return Object.keys(this.questions)[key];
        }
    },

    computed: {
        getQuestions() {
            return Object.values(this.questions)
        },
    },

    components: {
        FormButton,
        Notification
    }
}
</script>

<style lang="scss">
    @import '../../../scss/main.scss';

    .section-quiz-questions {
        padding: 50px 0;

        h1 {
            color: $blue-dark-1;
        }
    }
</style>