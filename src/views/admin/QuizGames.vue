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
                        <tbody class="table__body"  v-for="game in games" :key="game.id">
                            <tr class="table">
                                <td>{{game.id}}</td>
                                <td>{{game.name}}</td>
                                <td>{{game.description}}</td>
                                <td>{{game.time}}</td>
                                <td colspan="3">
                                    <router-link to="/" class="btn btn__primary">View Questions</router-link>
                                    <router-link to="/" class="btn btn__secondary">Edit</router-link>
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

import { mapGetters } from 'vuex';

export default {
    name: 'QuizGames',

    data() {
        return {
            games: []
        }
    },

    mounted() {
        this.games = this.getQuizGames;
    },

    computed: {
        ...mapGetters(['getQuizGames']),
    },
}
</script>

<style lang="scss">
    .section-quiz-game {
        padding: 50px 0;
    }
</style>