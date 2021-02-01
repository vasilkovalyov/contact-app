<template>
    <div class="quiz-results-details">
        <button class="btn-close" @click="handleCloseResultDetails">
            <i class="fas fa-times"></i>
        </button>
        <div class="container">
            <h2>Results</h2>

            <div class="results">
                <div class="results__list">
                    <div class="results__col" v-for="(item, i) in gameDetails" :key="i">
                        <div class="results-item" :class="item.trueAnswer === item.numberAnswer ? 'results-item-right' : 'results-item-wrong'">
                            <div class="results-item__question">
                                <h5>{{item.textQuestion}}</h5>
                            </div>
                            <div class="results-item__answer" >
                                <p>{{item.textAnswer}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameResultsDetails',

    props: ['gameDetails'],

    data() {
        return {}
    },

    methods: {
        handleCloseResultDetails() {
            this.$emit('closeResultDetails');
        }
    }
}
</script>