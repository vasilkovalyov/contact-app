<template>
    <div class="input-field">
        <label>
            <span class="input-field__label" v-if="label" >{{label}}</span>
            <input 
                :type="type" 
                :name="name" 
                :placeholder="placeholder" 
                class="input-field__input"
                :value="value"
                @blur="inputHandler($event.target.value)"
            >
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
        type: {
            type: String,
            default: 'text',
            required: false
        },
        label: {
            type: String,
            default: null,
            required: false
        },
        placeholder: {
            type: String,
            default: 'Fill input',
            required: false
        },
        value: {
            type: String,
            default: '',
            required: false
        }
    },

    methods: {
        inputHandler(value) {
            this.$emit('input', value);
        }
    }
}

</script>

<style lang="scss" scoped>
    .input-field {
        margin-bottom: 30px;

        &__label {
            color: #ffffff;
            text-transform: uppercase;
            display: block;
            font-size: 12px;
        }

        &__input {
            border: none;
            background-color: transparent;
            border-bottom: 1px solid #677987;
            padding: 10px 0;
            outline: none;
            color: #ffffff;
            font-family: 'Roboto';
            width: 100%;

            &::placeholder {
                color: #677987;

            }
        }
    }
</style>