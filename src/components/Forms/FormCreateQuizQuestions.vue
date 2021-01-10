<template>
    <form class="form-create-quiz">
        <FormSelect 
            v-model="formData.game"
            :value="formData.game"
            name="game-select" 
            baseOption="Select quiz" 
            :options="selectGames"
        >
            <template v-slot:label>Choose Quiz</template>
        </FormSelect>

        <InputField 
            v-model="formData.name"
            name="questions-name" 
            placeholder="Input questions name" 
        >
            <template v-slot:label>Questions name</template>
        </InputField>

        <FieldOptions
            caption="Options"
            :countOptions="countOptions"
            @handleChangeOptions="handleChangeOptions"
        />
        <FormButton :buttonClass="['btn__primary']" @clickHandler="handleClickSave" :loader="loader">Create Quiz</FormButton>
    </form>
</template>

<script>

import InputField from '@/components/FormsComponents/InputField';
import FormSelect from '../FormsComponents/FormSelect';
import TextAreaField from '@/components/FormsComponents/TextAreaField';
import FormButton from '../FormsComponents/FormButton';
import FieldOptions from '../FormsComponents/FieldOptions';

export default {
    name:'FormCreateQuizQuestions',

    props: {
        selectGames: {
            type: Array,
            required: false,
            default: []
        },
    },

    data() {
        return {
            formData: {
                name: '',
                game: '',
                options: []
            },
            countOptions: 4,
            loader: false,
        }
    },

    methods: {
        handleChangeOptions(data) {
            this.formData.options = data;
        },

        handleClickSave() {
            console.log(this.formData);
        }
    },

    components: {
        InputField,
        FormSelect,
        TextAreaField,
        FormButton,
        FieldOptions
    }
}

</script>

<style lang="scss">
    .form-create-quiz {
        padding: 50px;
    }
</style>