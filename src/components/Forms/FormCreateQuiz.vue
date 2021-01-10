<template>
    <form class="form-create-quiz">
        <InputField 
            v-model="formData.name"
            name="quiz-name" 
            placeholder="Input quiz name" 
        >
            <template v-slot:label>Quiz name</template>
        </InputField>
        <TextAreaField
            v-model="formData.description"
            name="quiz-description"
            placeholder="Input quiz description" 
        >
            <template v-slot:label>Quiz description</template>
        </TextAreaField>
        <InputField 
            v-model="formData.time"
            name="quiz-time" 
            placeholder="Input quiz time" 
        >
            <template v-slot:label>Time (in minute)</template>
        </InputField>
        <FormButton :buttonClass="['btn__primary']" @clickHandler="handleClickSave" :loader="loader">Create Quiz</FormButton>
    </form>
</template>

<script>

import InputField from '@/components/FormsComponents/InputField';
import TextAreaField from '@/components/FormsComponents/TextAreaField';
import FormButton from '../FormsComponents/FormButton';



export default {
    name:'FormCreateQuiz',

    data() {
        return {
            formData: {
                name: '',
                description: '',
                time: '',
            },
            loader: false,
        }
    },

    methods: {
        handleClickSave() {
            this.$emit('handleClick', this.formData);
        }
    },

    components: {
        InputField,
        TextAreaField,
        FormButton,
    }
}

</script>

<style lang="scss">
    .form-create-quiz {
        padding: 50px;
    }
</style>