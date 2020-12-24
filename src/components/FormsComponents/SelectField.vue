<template>
    <div class="select-field">
        <label>
            <span class="select-field__label" v-if="label" >{{label}}</span>
            <select class="select-field__select" :name="name" :value="value" @change="selectHandler($event.target.value)">
                <template>
                    <option value="">{{baseOption}}</option>
                </template>
                <template v-for="(option, key) in arrayOptions" >
                    <option :value="option.value" :key="key">{{option.value}}</option>
                </template>
            </select>
        </label>
    </div>
</template>

<script>

export default {
    props: {
        name: {
            type: String,
            default: 'text',
            required: true
        },
        label: {
            type: String,
            default: null,
            required: false
        },
        baseOption: {
            type: String,
            default: 'Select option',
            required: false
        },
        arrayOptions: {
            type: Array,
            default: [],
            required: false
        },
        value: {
            type: String,
            default: '',
            required: false
        }
    },

    data() {
        return {
            
        }
    },

    methods: {
        selectHandler(value) {
            this.$emit('input', value);
        }
    }
}

</script>


<style lang="scss" scoped>
    .select-field {
        margin-bottom: 30px;

        &__label {
            color: #ffffff;
            text-transform: uppercase;
            display: block;
            font-size: 12px;
        }

        &__select {
            border: none;
            background-color: transparent;
            border-bottom: 1px solid #677987;
            padding: 10px 0;
            outline: none;
            font-family: 'Roboto';
            width: 100%;
            color: #677987;

            &::placeholder {
                color: #677987;
            }

            option {
                color: #000000;
                
                &:nth-child(1) {
                    display: none;
                }
            }
        }
    }
</style>