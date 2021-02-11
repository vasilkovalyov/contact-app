<template>
    <section class="section-quiz-app">
        <template v-if="isVisibleGame">
            <div class="container">
                <div class="quiz" v-if="loading">
                    <form class="quiz-app">
                        <div class="quiz-app-question" v-for="(question, i) in questions" :key="question.key">
                            <template class="quiz-app-question__inner" v-if="targetPageNumber === i">
                                <div class="quiz-app__header">
                                    <h2>{{question.question}}</h2>
                                </div>
                                <ul class="quiz-app__answer-list">
                                    <li class="quiz-app__answer-item"  v-for="(answer, j) in question.questionsArray" :key="j" >
                                        <label :class="answerObjArray[i].numberAnswer === j ? 'active' : ''">
                                            <input type="radio"  :name="i" @change="selectResponse(question.key, j, answer, question.question, question.trueAnswer)">{{answer}}
                                        </label>
                                    </li>
                                </ul>
                            </template>
                        </div>
                    </form>
                    <div class="quiz-navigation">
                        <Progress :targetPage="targetPageNumber+1" :totalPages="totalPageCount">
                            <template v-slot:title>Questions</template>
                        </Progress>
                        <div class="quiz-navigation__btn-wrap">
                            <button class="btn" :disabled="!disabledPrevButton" @click="onPrevPage()">Prev</button>
                            <button class="btn" :disabled="!disabledNextButton" @click="onNextPage()">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <ResultsGame 
                :bgColor="createBackgroundString"
                :resultMessage="results[targetResultNumber].message"
                :rightAnswerCount="rightAnswerCount"
                :totalPageCount="totalPageCount"
                :resultImage="results[targetResultNumber].image"
                :answerObjArray="answerObjArray"
            />
        </template>
    </section>
</template>

<script>


import firebase from '@/firebase';
import { getFormatUrl } from '@/helpers';
import { mapGetters } from 'vuex';

import Progress from '@/components/Progress';
import ResultsGame from '@/components/ResultsGame';

export default {
    name: 'Game',
    
    data () {
        return {
            targetKeyGame: null,
            questions: [],
            targetPageNumber: 0,
            totalPageCount: 0,
            answerObjArray: [],
            loading: false,
            disabledPrevButton: false,
            disabledNextButton: false,
            isVisibleGame: true,
            isVisibleDetailsQuiz: false,
            targetResultNumber: 0,
            rightAnswerCount: 0,
            results: [
                {
                    message: 'Better luck next time, you scored',
                    image: 'result-image-1.svg',
                    color: '#F20E4A',
                },
                {
                    message: 'Better luck next time, you scored',
                    image: 'result-image-1.svg',
                    color: '#EC3A69',
                },
                {
                    message: 'Better luck next time, you scored',
                    image: 'result-image-1.svg',
                    color: '#FC566A',
                },
                {
                    message: 'Nearly perfect, you scored',
                    image: 'result-image-2.svg',
                    color: '#FC56CD',
                },
                {
                    message: 'Nearly perfect, you scored',
                    image: 'result-image-3.svg',
                    color: '#43CAC8',
                },
                {
                    message: 'Excellent, you scored',
                    image: 'result-image-4.svg',
                    color: '#22CBF1',
                },
            ],
        }
    },

    computed: {
        ...mapGetters(['getAuthUserDate']),

        getDisabledNext() {
            return  this.targetPageNumber >= this.totalPageCount+1 || this.answerObjArray[this.targetPageNumber].numberAnswer === '' ? true : false;
        },
        getDisabledPrev() {
            return this.targetPageNumber === 0 ? true : false;
        },

        getQuestions() {
            return Object.values(this.questions)
        },

        createBackgroundString() {
            return `linear-gradient(129deg, ${this.results[this.targetResultNumber].color} 0%, ${this.results[this.targetResultNumber].color} 50%, #ffffff 50% ,#ffffff 100%)`;
        },

        getPercentRightAnswer() {
            return (this.rightAnswerCount / this.totalPageCount) * 100;
        }
    },

    methods: {
        percentRightAnswer(countRightAnswer) {
            const n = countRightAnswer;
            switch(true) {
                case (n == 0) : {
                    return 0;
                }
                case (n > 0 && n <= 25) : {
                    return 1;
                }
                case (n > 25 && n <= 50) : {
                    return 2;
                }
                case (n > 50 && n <= 75) : {
                    return 3;
                }
                case (n > 75 && n < 100) : {
                    return 4;
                }
                case (n == 100) : {
                    return 5;
                }
                default: {
                    return;
                }
            }
        },

        selectResponse(keyGame, numberAnswer, textAnswer, textQuestion, trueAnswer) { 
            this.answerObjArray.forEach(function(item, i) {
                if(item.key === keyGame) {
                    item.selected = true;
                    item.textAnswer = textAnswer;
                    item.numberAnswer = numberAnswer;
                    item.textQuestion = textQuestion;
                    item.trueAnswer = parseInt(trueAnswer);
                }
            }, this.answerObjArray);

            this.disabledNextButton = true;
        },

        onNextPage() {
            if(this.targetPageNumber+2 < this.totalPageCount+1) {
                this.targetPageNumber++;
                this.disabledNextButton = false;
            } else {
                this.isVisibleGame = false;
                this.sendUserData();
            }

            if(this.targetPageNumber+1 >= 2) {
                this.disabledPrevButton = true;
            }
        },

        sendUserData() {
            const self = this;
            const filterRightAnswers = this.answerObjArray.filter((item, i) => self.questions[i].trueAnswer == item.numberAnswer)
            this.rightAnswerCount = filterRightAnswers.length;
            this.targetResultNumber = this.percentRightAnswer(this.getPercentRightAnswer);
        },

        onPrevPage() {
            if(this.targetPageNumber === 1){
                this.disabledPrevButton = false;
                this.disabledNextButton = true;
            }
            this.targetPageNumber--;
        },
    },

    async mounted() {
        const targetCategory = this.$route.query.category;
        const posts = await firebase.loadPosts('games');
        for(let post in posts) {
            let item = posts[post];
            if(getFormatUrl(item.name) == targetCategory) {
                this.targetKeyGame = item.key;
            }
        }
         const response = await firebase.getAllPostFromCollection('games', 'questions', this.targetKeyGame);

        if(response) {
            for(let item in response) {
                this.questions.push({
                    key: item,
                    question: response[item].question,
                    questionsArray: response[item].questionsArray,
                    trueAnswer: response[item].trueAnswer,
                })

                this.answerObjArray.push({
                    key: item,
                    numberAnswer: null,
                    textAnswer: '',
                    textQuestion: '',
                    trueAnswer: null,
                    selected: false,
                })
            }
            this.totalPageCount = Object.values(this.questions).length;
            this.loading = true;
        }
    },

    components: {
        Progress,
        ResultsGame,
    }
}

</script>

<style lang="scss">
    @import '../../scss/base/variables.scss';

    
</style>