<template>
    <div class="view-questions-page">
        <section class="section-view-questions">
            <div class="container">
                <h1>View Question</h1>
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
                    <router-link to="/admin/quiz-games" tag="a" class="btn btn__primary">Back</router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import firebase from '@/firebase';

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
    }
}
</script>

<style lang="scss">
    @import '../../../scss/main.scss';

    .section-view-questions {
        padding: 50px 0;

        h1 {
            color: $blue-dark-1;
        }
    }

    .question-view-list {
        margin-bottom: 30px;
    }

    .question-view {
        margin-bottom: 20px;

        &__question {
            border-bottom: 1px solid;
            padding-bottom: 5px;
        }

        &__list {
            list-style-type: none;
            margin: 0;
            padding: 0 0 0 10px;

            &-complete {
                color: $white;
                background-color: $primary-color;
                font-size: 12px;
                border-radius: 10px;
                display: inline-block;
                padding: 2px 5px;
                margin-left: 5px;
            }

            li {
                display: flex;
                align-items: center;
                
                &:not(:last-child) {
                    margin-bottom: 10px;
                }
            }

        }
    }
</style>