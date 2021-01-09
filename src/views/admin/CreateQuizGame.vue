<template>
    <section class="section-quiz-game">
        <div class="container">
            <h1>Create Quiz Game</h1>
            <div class="quiz-panel">
                <FormCreateQuiz />
            </div>
        </div>
    </section>
</template>
<script>

import FormCreateQuiz from '@/components/Forms/FormCreateQuiz';

export default {
    name: 'CreateQuizGame',

    data() {
        return {
            
        }
    },

    components: {
        FormCreateQuiz
    }
}
</script>