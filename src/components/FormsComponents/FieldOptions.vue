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

<style lang="scss">
    @import '../../scss/base/variables.scss';

    .field-options {
        &__caption {
            color: $blue-dark;
            display: block;
            font-size: 14px;
            margin-bottom: 13px;
            font-weight: 600;
        }   
    }

    .option {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        &__input {
            border: 2px solid $light;
            font-size: 14px;
            border-radius: 5px;
            box-shadow: 0px 0px 11px 1px rgba(233, 236, 240, 0);
            font-family: "Roboto";
            transition: box-shadow .3s ease-in-out;
            height: 40px;
            padding: 10px;
            outline: none;
            width: 70%;
            margin-right: 30px;
        }

        &__label {
            font-size: 14px;
            color: $blue-dark;
            font-weight: 600;
            padding-left: 10px;
        }
    }
</style>