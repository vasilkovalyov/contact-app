<template>
    <section class="section-quiz-app">
        <div class="container">
            <div class="quiz" v-if="loading">
                <form class="quiz-app">
                    <div class="quiz-app-question" v-for="(question, i) in questions" :key="question.key">
                        <template class="quiz-app-question__inner" v-if="targetPageCount === i">
                            <div class="quiz-app__header">
                                <h2>{{question.question}}</h2>
                            </div>
                            <ul class="quiz-app__answer-list">
                                <li class="quiz-app__answer-item"  v-for="(answer, j) in question.questionsArray" :key="j" >
                                    <label :class="answerObjArray[i].numberAnswer === j ? 'active' : ''">
                                        <input type="radio"  :name="i" @change="selectResponse(question.key,  j)">{{answer}}
                                    </label>
                                </li>
                            </ul>
                        </template>
                    </div>
                </form>
                <div class="quiz-navigation">
                    <Progress :targetPage="targetPageCount+1" :totalPages="totalPageCount">
                        <template v-slot:title>Questions</template>
                    </Progress>
                    <div class="quiz-navigation__btn-wrap">
                        <button class="btn" :disabled="getDisabledPrev" @click="onPrevPage()">Prev</button>
                        <button class="btn" :disabled="getDisabledNext" @click="onNextPage()">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>


import firebase from '@/firebase';

import { mapGetters } from 'vuex';

import Progress from '@/components/Progress';

export default {
    name: 'Home',
    
    data () {
        return {
            questions: [],
            targetPageCount: 0,
            totalPageCount: 0,
            answerObjArray: [],
            loading: false,
        }
    },

    computed: {
        ...mapGetters(['getAuthUserDate']),

        getDisabledNext() {
            return  this.targetPageCount >= this.totalPageCount || this.answerObjArray[this.targetPageCount].numberAnswer === '' ? true : false;
        },
        getDisabledPrev() {
            return this.targetPageCount === 0 ? true : false;
        },
        getQuestions() {
            return Object.values(this.questions)
        },
    },

    methods: {
        hasKeyInArray(array, key) {
            for(let i = 0; i < array.length; i++) {
                const item = array[i];
                if(item.keyGame === key) {
                    return true;
                }
            }
            return false;
        },

        selectResponse(keyGame, numberAnswer) { 
            this.answerObjArray.forEach(function(item, i) {
                if(item.key === keyGame) {
                    item.selected = true;
                    item.numberAnswer = numberAnswer;
                }
            }, this.answerObjArray)
        },

        onNextPage() {
            this.targetPageCount++;
        },

        onPrevPage() {
            this.targetPageCount--;
        }
    },

    async mounted() {
        const keyPost = '-MRFmH43jJjFhff7xnGW';
        const response = await firebase.getAllPostFromCollection('games', 'questions', keyPost);
        if(response) {
            for(let item in response) {
                this.questions.push({
                    key: item,
                    question: response[item].question,
                    questionsArray: response[item].questionsArray,
                })

                this.answerObjArray.push({
                    key: item,
                    numberAnswer: '',
                    selected: false,
                })
            }
            this.totalPageCount = Object.values(this.questions).length;
            this.loading = true;
        }
    },

    components: {
        Progress
    }
}

</script>

<style lang="scss">
    @import '../../scss/base/variables.scss';

    .section-quiz-app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .quiz {
        padding: 50px 0;
    }

    .quiz-navigation {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn {
            margin-left: 20px;
        }
    }

    .quiz-app {

        h2 {
            margin-bottom: 0;
        }

        &__header {
            background: #2FB0F9;
            border-radius: 20px 20px 0px 0px;
            padding: 50px;
            text-align: center;
            color: $white;
        }
        
        &__answer-list {
            padding: 0;
            margin: 0;
            display: flex;
        }
        
        &__answer-item {
            list-style-type: none;
            background-color: $white;
            color: #004494;
            border-radius: 0 0 20px 20px;
            width: 25%;
            text-align: center;
            overflow: hidden;

            label {
                display: block;
                padding: 50px;
                cursor: pointer;
                font-weight: 600;
                transition: background 0.3s linear, color 0.3s linear;

                &.active {
                    background: linear-gradient(180deg, #18EDD5 37.98%, #64CEE6 100%);
                    color: #004494;
                }
            }

            input {
                display: none;
            }
        }
    }

    .quiz-app-question {
        margin-bottom: 50px;
    }
</style>