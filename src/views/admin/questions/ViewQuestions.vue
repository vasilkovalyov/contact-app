<template>
    <div class="view-questions-page">
        <section class="section-admin-default">
            <div class="container">
                <AdminSectionHeader>
                    <template v-slot:title>View Question</template>
                </AdminSectionHeader>
                <div class="section-admin-default__body">
                    <div class="question-view-wrapper">
                        <div class="question-view-list">
                            <div class="question-view" v-for="(question, i) in questions" :key="i">
                                <p class="question-view__question">{{question.question}}</p>
                                <ul class="question-view__list">
                                    <li v-for="(answer, j) in question.questionsArray" :key="j">
                                        {{answer}}
                                        <template v-if="j === parseInt(question.trueAnswer)">
                                            <span class="question-view__list-complete">correct answer</span>
                                        </template>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="btn-wrap">
                            <router-link to="/admin/quiz-games" tag="a" class="v-btn v-btn__primary">Back</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import firebase from '@/firebase';

import AdminSectionHeader from '@/components/AdminSectionHeader';


export default {
    name: 'ViewQuestions',

    data() {
        return {
            questions: []
        }
    },

    async mounted() {
        const key = this.$route.params.id;
        const targetPost = await firebase.getPostById('games', key);

        const isHasProperty = targetPost.hasOwnProperty('questions');

        if(isHasProperty) {
            const questions = targetPost.questions;
            this.questions = Object.values(questions);
        }
    },
    
    components: {
        AdminSectionHeader
    }
}
</script>