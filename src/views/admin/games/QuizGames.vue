<template>
    <section class="section-quiz-game">
        <div class="container">
            <h1>Quiz Games</h1>

            <div class="quiz-panel">
                <table class="table">
                    <thead class="table__header">
                        <tr>
                            <td>#</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Time</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <template v-if="games.length > 0">
                        <tbody class="table__body">
                            <tr v-for="(game, i) in games" :key="game.key">
                                <td>{{++i}}</td>
                                <td>{{game.name}}</td>
                                <td>{{game.description}}</td>
                                <td>{{game.time}}</td>
                                <td colspan="3">
                                    <router-link :to="'/admin/view-questions/'+game.key" class="btn btn__primary">View Questions
                                        <span class="btn__tip">{{getQuestionsLength(game.questions)}}</span>
                                    </router-link>
                                    <router-link :to="'/admin/edit-game/'+game.key" class="btn btn__secondary">Edit</router-link>
                                    <FormButton :buttonClass="['btn__third']" @clickHandler="onClickRemove(game.key)" :loader="loader">Delete</FormButton>
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

import { mapGetters, mapActions } from 'vuex';

import FormButton from '@/components/FormsComponents/FormButton';


export default {
    name: 'QuizGames',

    data() {
        return {
            games: [],
            loader: false,
        }
    },

    async mounted() {
        await this.onLoadGames();
        this.games = await this.getQuizGames;
    },

    methods: {
        ...mapActions(['onLoadGames']),

        onClickRemove(key) {
            console.log(key);
        },

        getQuestionsLength(objArrays) {
            return Object.entries(objArrays).length;
        }
    },

    computed: {
        ...mapGetters(['getQuizGames']),
    },

    components: {
        FormButton
    }
}
</script>

<style lang="scss">
    @import '../../../scss/main.scss';

    .section-quiz-game {
        padding: 50px 0;

        h1 {
            color: $blue-dark-1;
        }
    }
</style>