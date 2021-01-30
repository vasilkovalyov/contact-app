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
                                    <router-link :to="'/admin/view-questions/'+game.key" class="v-btn v-btn__primary">View Questions
                                        <span class="btn__tip">{{getQuestionsLength(game.questions)}}</span>
                                    </router-link>
                                    <router-link :to="'/admin/edit-game/'+game.key" class="v-btn v-btn__secondary">Edit</router-link>
                                    <FormButton :buttonClass="['v-btn__third']" @clickHandler="onClickRemove(game.key)">Delete</FormButton>
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

import { mapGetters, mapActions } from 'vuex';

import FormButton from '@/components/FormsComponents/FormButton';
import Notification from '@/components/Notification';

export default {
    name: 'QuizGames',

    data() {
        return {
            games: [],
            loaderBtnDelete: false,
            isShowNotification: false,
            notification: {
                message: '',
                type: ''
            },
        }
    },

    async mounted() {
        await this.onLoadGames();
        this.games = await this.getQuizGames;

    },

    methods: {
        ...mapActions(['onLoadGames']),

        async onClickRemove(keyGame) {
            try {
                this.loaderBtnDelete = true;
                await firebase.removePost('games', keyGame);
                this.games = this.games.filter(game => game.key !== keyGame);
                this.initNotification(true);
                this.loaderBtnDelete = false;
            } catch(e) {
                console.log(e);
                this.initNotification(false);
                this.loaderBtnDelete = false;
            }
        },

        getQuestionsLength(objArrays) {
            if(objArrays) {
                return Object.entries(objArrays).length;
            } else {
                return 0;
            }
        },

        closeNotification() {
            this.isShowNotification = false;
        },

        initNotification(flag) {
            this.isShowNotification = true;

            if(flag) {
                this.notification.message = 'Quiz Game Remove - Successfull',
                this.notification.type = 'successfull'
            } else {
                this.notification.message = 'Quiz Game Remove - Error',
                this.notification.type = 'error'
            }
        },
    },

    computed: {
        ...mapGetters(['getQuizGames']),
    },

    components: {
        FormButton,
        Notification
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