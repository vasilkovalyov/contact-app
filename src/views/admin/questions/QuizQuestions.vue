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
                    <template v-if="loader === true || questions.length > 0">
                        <tbody class="table__body">
                            <tr v-for="(item, i) in Object.values(questions)" :key="Object.keys(questions)[i]">
                                <td>{{i+1}}</td>
                                <td>{{item.question}}</td>
                                <td>{{item.game.label}}</td>
                                <td>{{item.dateCreated}}</td>
                                <td colspan="3">
                                    <router-link 
                                        :to="{ path: `/admin/edit-question/game/${item.game.code}/question/${Object.keys(questions)[i]}`}"
                                        class="btn btn__secondary">Edit</router-link>
                                    <router-link to="/" class="btn btn__third">Delete</router-link>
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
    </section>
</template>
<script>

import firebase from '@/firebase';

export default {
    name: 'QuizQuestions',

    data() {
        return {
            questions: [],
            loader: false,
        }
    },

    async mounted() {
        let newArrayPosts = {};

        const posts = await firebase.loadPosts('games');

        await posts.forEach((post) => {
            newArrayPosts = Object.assign(newArrayPosts, post.questions);
        })

        this.questions = await newArrayPosts;
        this.loader = true;
    },

    methods: {
    },

    computed: {},
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