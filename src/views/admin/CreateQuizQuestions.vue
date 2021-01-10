<template>
    <section class="section-quiz-game">
        <div class="container">
            <h1>Create Quiz Questions</h1>
            <div class="quiz-panel">
                <FormCreateQuizQuestions
                    :selectGames="getQuestionsForSelect"
                    @handleClick="formSubmit"
                 />
            </div>
        </div>
    </section>
</template>
<script>

import { mapGetters } from 'vuex';

import FormCreateQuizQuestions from '@/components/Forms/FormCreateQuizQuestions';

export default {
    name: 'CreateQuizQuestions',

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

        getQuestionsForSelect() {
            return this.getQuizGames.map((item) => ({
                'value': item.name
            }));
        }
    },

    methods: {
        formSubmit(formData) {
            console.log(formData);
        }
    },

    components: {
        FormCreateQuizQuestions
    }
}
</script>