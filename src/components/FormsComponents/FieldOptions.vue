<template>
    <div class="field-options">
        <div class="field-options__caption">{{caption}}</div>
        <div class="options" v-for="(option, key) in countOptions" :key="key">
            <div class="option">
                <input class="option__input" v-model="dataOptions.options[key]" />
                <label>
                    <input type="radio" name="options" :value="key" v-model="dataOptions.trueAnswer">
                    <span class="option__label">Is correct answer</span>
                </label>
            </div>
        </div>
    </div>
</template>


<script>


export default {
    name: 'FieldOptions',

    props: ['caption', 'countOptions', 'data', 'answer'],

    data() {
        return {
            name: '',
            dataOptions: {
                options: [],
                trueAnswer: ''
            }
        }
    },

    watch: {
        'dataOptions.options'(old, newValue) {
            this.$emit('handleChangeOptions', {
                options: this.dataOptions.options,
                trueAnswer: this.trueAnswer,
            })
        },
        'dataOptions.trueAnswer'(old, newValue) {
            this.trueAnswer = old;
            this.$emit('handleChangeOptions', {
                options: this.dataOptions.options,
                trueAnswer: old,
            })
        }
    },

    async mounted() {
        this.dataOptions.options = await this.data || [];
        this.dataOptions.trueAnswer = await this.answer || '';
    }
}
</script>