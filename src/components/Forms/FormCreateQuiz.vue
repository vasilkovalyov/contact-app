<template>
    <form class="form-create-quiz">
        <InputField 
            v-model="formData.name"
            name="quiz-name" 
            placeholder="Input quiz name" 
        >
        <template v-slot:label>Quiz name</template>
        </InputField>
    </form>
</template>

<script>

import InputField from '@/components/FormsComponents/InputField';


export default {
    name:'FormCreateQuiz',

    data() {
        return {
            formData: {
                name: '',
                description: '',
                time: '',
            }
        }
    },

    components: {
        InputField
    }
}

</script>

<style lang="scss">

</style>