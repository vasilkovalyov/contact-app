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
                            <!-- <button class="btn" :disabled="getDisabledPrev" @click="onPrevPage()">Prev</button> -->
                            <!-- <button class="btn" :disabled="getDisabledNext" @click="onNextPage()">Next</button> -->
                            <button class="btn" :disabled="!disabledPrevButton" @click="onPrevPage()">Prev</button>
                            <button class="btn" :disabled="!disabledNextButton" @click="onNextPage()">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="quiz-results">
                <div class="container">
                    <div class="quiz-results__bg-category" :style="{ background: createBackgroundString }"></div>
                    <div class="quiz-results__content">
                        <svg class="stars" width="190" height="166" viewBox="0 0 190 166" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <rect x="44.3979" y="36.2908" width="22.7226" height="26.3684" fill="url(#pattern0)"></rect>
                            <path d="M57.1278 50.852C55.2181 52.8677 54.7938 58.3845 54.7938 58.3845C54.7938 58.3845 54.8999 53.186 52.778 50.7459C50.338 48.3058 46.4126 48.4119 46.4126 48.4119C46.4126 48.4119 49.8075 48.3058 52.3537 45.7597C54.2633 43.7439 54.7938 38.3333 54.7938 38.3333C54.7938 38.3333 55.2181 43.5318 57.1278 45.6536C59.5679 48.0937 62.7506 48.3058 62.7506 48.3058C62.7506 48.3058 59.78 48.1998 57.1278 50.852Z" fill="white"></path>
                            <rect x="140.939" y="5.53473" width="30.862" height="36.3731" fill="url(#pattern1)"></rect>
                            <path d="M159.022 26.2496C156.264 29.3262 155.627 37.6013 155.627 37.6013C155.627 37.6013 155.733 29.7506 152.657 26.1435C148.943 22.4303 143.108 22.6425 143.108 22.6425C143.108 22.6425 148.201 22.5364 152.02 18.7172C154.884 15.6405 155.627 7.57764 155.627 7.57764C155.627 7.57764 156.158 15.4284 159.128 18.6111C162.841 22.3243 167.509 22.6425 167.509 22.6425C167.509 22.6425 162.947 22.3243 159.022 26.2496Z" fill="white"></path>
                            <rect x="102.484" y="46" width="18.1442" height="20.7725" fill="url(#pattern2)"></rect>
                            <path d="M112.284 57.0067C110.905 58.492 110.587 62.4174 110.587 62.4174C110.587 62.4174 110.587 58.7042 109.207 56.9006C107.404 55.0971 104.646 55.2032 104.646 55.2032C104.646 55.2032 107.086 55.2032 108.889 53.2936C110.268 51.8083 110.587 47.989 110.587 47.989C110.587 47.989 110.905 51.7022 112.284 53.2936C114.088 55.0971 116.315 55.2032 116.315 55.2032C116.315 55.2032 114.194 55.2032 112.284 57.0067Z" fill="white"></path>
                            <rect x="1.67725" y="9.77252" width="37.7579" height="43.2275" fill="url(#pattern3)"></rect>
                            <path d="M22.07 32.6775C19.2 35.7683 18.5376 43.937 18.5376 43.937C18.5376 43.937 18.5376 36.2099 15.6676 32.4567C11.9144 28.7035 6.17432 28.9243 6.17432 28.9243C6.17432 28.9243 11.2521 28.9243 15.0053 24.9504C17.8753 21.8595 18.5376 13.9117 18.5376 13.9117C18.5376 13.9117 19.2 21.6388 22.07 24.9504C25.8232 28.7035 30.4595 28.9243 30.4595 28.9243C30.4595 28.9243 26.044 28.9243 22.07 32.6775Z" fill="white"></path>
                            <rect x="171.484" y="53" width="18.1442" height="20.7725" fill="url(#pattern4)"></rect>
                            <path d="M181.322 64.0711C179.942 65.5563 179.624 69.4817 179.624 69.4817C179.624 69.4817 179.624 65.7685 178.245 63.965C176.441 62.1614 173.683 62.2675 173.683 62.2675C173.683 62.2675 176.123 62.2675 177.927 60.3579C179.306 58.8726 179.624 55.0533 179.624 55.0533C179.624 55.0533 179.942 58.7665 181.322 60.3579C183.125 62.1614 185.353 62.2675 185.353 62.2675C185.353 62.2675 183.125 62.1614 181.322 64.0711Z" fill="white"></path>
                            <rect y="56.7823" width="15.1535" height="20.7725" fill="url(#pattern5)"></rect>
                            <path d="M8.16916 67.8289C7.10825 69.3141 6.78998 73.3456 6.78998 73.3456C6.78998 73.3456 6.78998 69.6324 5.62298 67.8289C4.13771 66.0253 1.80371 66.1314 1.80371 66.1314C1.80371 66.1314 3.81944 66.1314 5.4108 64.2218C6.5778 62.7365 6.89607 58.9172 6.89607 58.9172C6.89607 58.9172 7.10825 62.6304 8.27525 64.2218C9.76052 66.0253 11.6702 66.1314 11.6702 66.1314C11.6702 66.1314 9.76052 65.9192 8.16916 67.8289Z" fill="white"></path>
                            <rect x="166.36" y="4.03943" width="18.1442" height="20.7725" fill="url(#pattern6)"></rect>
                            <path d="M176.209 15.1101C174.83 16.5954 174.512 20.5208 174.512 20.5208C174.512 20.5208 174.512 16.8076 173.133 15.004C171.329 13.2005 168.571 13.3066 168.571 13.3066C168.571 13.3066 171.011 13.3066 172.814 11.3969C174.194 9.91167 174.512 6.09241 174.512 6.09241C174.512 6.09241 174.83 9.80558 176.209 11.3969C178.013 13.2005 180.241 13.3066 180.241 13.3066C180.241 13.3066 178.013 13.2005 176.209 15.1101Z" fill="white"></path>
                            <rect x="53.4844" width="18.1442" height="20.7725" fill="url(#pattern7)"></rect>
                            <path d="M63.267 11.057C61.8878 12.5423 61.5695 16.4676 61.5695 16.4676C61.5695 16.4676 61.5695 12.7545 60.1903 10.9509C58.3868 9.14739 55.6284 9.25348 55.6284 9.25348C55.6284 9.25348 58.0685 9.25348 59.872 7.34384C61.2512 5.85857 61.5695 2.03931 61.5695 2.03931C61.5695 2.03931 61.8878 5.75248 63.267 7.34384C65.0705 9.14739 67.2984 9.25348 67.2984 9.25348C67.2984 9.25348 65.1766 9.14739 63.267 11.057Z" fill="white"></path>
                            <rect x="85.4844" y="148" width="15.855" height="17.9746" fill="url(#pattern8)"></rect>
                            <path d="M93.7143 157.336C92.6534 158.503 92.4412 161.686 92.4412 161.686C92.4412 161.686 92.4412 158.715 91.2742 157.23C89.895 155.851 87.561 155.851 87.561 155.851C87.561 155.851 89.5768 155.851 90.9559 154.365C92.0168 153.198 92.3351 150.122 92.3351 150.122C92.3351 150.122 92.5473 153.092 93.7143 154.365C95.0935 155.745 96.897 155.957 96.897 155.957C96.897 155.957 95.3057 155.745 93.7143 157.336Z" fill="white"></path>
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0"></use>
                                </pattern>
                                <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image1"></use>
                                </pattern>
                                <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image2"></use>
                                </pattern>
                                <pattern id="pattern3" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image2"></use>
                                </pattern>
                                <pattern id="pattern4" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image3"></use>
                                </pattern>
                                <pattern id="pattern5" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image4"></use>
                                </pattern>
                                <pattern id="pattern6" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image2"></use>
                                </pattern>
                                <pattern id="pattern7" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image3"></use>
                                </pattern>
                                <pattern id="pattern8" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image5"></use>
                                </pattern>
                                <image id="image0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAFFCAYAAABMujBpAAAACXBIWXMAAIqQAACKkAFGhqEXAAAA"></image>
                                <image id="image1" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXcAAAG2CAYAAACEdMbvAAAACXBIWXMAAIqQAACKkAFGhqEXAAAA"></image>
                                <image id="image2" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAAD6CAYAAABXoiAiAAAACXBIWXMAAIqQAACKkAFGhqEXAAAA"></image>
                                <image id="image3" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAAEHCAYAAABY2SFRAAAACXBIWXMAAIqQAACKkAFGhqEXAAAA"></image>
                                <image id="image4" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAE7CAYAAADjDQxRAAAACXBIWXMAAKXwAACl8AEha41CAAAA"></image>
                                <image id="image5" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADhCAYAAACN+/pgAAAACXBIWXMAAIqQAACKkAFGhqEXAAAA"></image>
                            </defs>
                        </svg>
                        <h3>{{results[targetResultNumber].message}}</h3>
                        <div class="quiz-results__score">
                            <strong>{{rightAnswerCount}}</strong>
                            <span>out of</span>
                            <strong>{{totalPageCount}}</strong>
                        </div>
                        <button class="btn" @click="openResultDetails">Show details</button>
                    </div>
                    <div class="quiz-results__image">
                        <img :src="'./images/'+results[targetResultNumber].image" alt="img-result">
                    </div>
                </div>
            </div>
        </template>
        <template v-if="isVisibleDetailsQuiz">
            <GameResultsDetails 
                :gameDetails="answerObjArray"
                @closeResultDetails="closeResultDetails"
            />
        </template>
    </section>
</template>

<script>


import firebase from '@/firebase';

import { mapGetters } from 'vuex';

import Progress from '@/components/Progress';
import GameResultsDetails from '@/components/GameResultsDetails';

export default {
    name: 'Home',
    
    data () {
        return {
            targetKeyGame: '-MRFmH43jJjFhff7xnGW',
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
    },

    methods: {
        closeResultDetails() {
            this.isVisibleDetailsQuiz = false;
        },

        openResultDetails() {
            this.isVisibleDetailsQuiz = true;
        },

        percentRightAnswer(countRightAnswer) {
            const n = countRightAnswer;
            switch(true) {
                case 0 : {
                    this.targetResultNumber = 0;
                    break;
                }
                case (n > 0 && n <= 25) : {
                    this.targetResultNumber = 1;
                    break;
                }
                case (n > 25 && n <= 50) : {
                    this.targetResultNumber = 2;
                    break;
                }
                case (n > 50 && n <= 75) : {
                    this.targetResultNumber = 3;
                    break;
                }
                case (n > 75 && n < 100) : {
                    this.targetResultNumber = 4;
                    break;
                }
                case 100 : {
                    this.targetResultNumber = 5;
                    break;
                }
                default: {
                    return;
                }
            }
        },

        hasKeyInArray(array, key) {
            for(let i = 0; i < array.length; i++) {
                const item = array[i];
                if(item.keyGame === key) {
                    return true;
                }
            }
            return false;
        },

        selectResponse(keyGame, numberAnswer, textAnswer, textQuestion, trueAnswer) { 
            this.answerObjArray.forEach(function(item, i) {
                if(item.key === keyGame) {
                    item.selected = true;
                    item.textAnswer = textAnswer;
                    item.numberAnswer = numberAnswer;
                    item.textQuestion = textQuestion;
                    item.trueAnswer = trueAnswer;
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

            const filterRightAnswers = this.answerObjArray.filter((item, i) => {
                return self.questions[i].trueAnswer == item.numberAnswer
            })


            this.rightAnswerCount = filterRightAnswers.length;
            const percentRightAnswer = (this.rightAnswerCount / this.totalPageCount) * 100;
            this.percentRightAnswer(percentRightAnswer)
            console.log(this.answerObjArray);
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
        GameResultsDetails
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