<template>
    <div class="textarea-component">
        <label class="textarea-field__label">
            <slot name='label'></slot>
        </label>
        <div class="textarea-field">
            <textarea 
                :name="name" 
                :placeholder="placeholder" 
                class="textarea-field__textarea"
                :value="value"
                :disabled="disabled"
                @blur="inputHandler($event.target.value)"
                rows="5"
            ></textarea>
        </div>
    </div>
</template>
<script>

export default {
    name: 'TextAreaField',
    props: {
        name: {
            type: String,
            default: 'text',
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
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
    },

    methods: {
        inputHandler(value) {
            this.$emit('input', value);
        }
    }
}

</script>

<style lang="scss">
    @import '../../scss/base/variables.scss';

    .textarea-component {
        width: 100%;
        margin-bottom: 18px;
    }

    .textarea-field {
        width: 100%;
        position: relative;

        &__label {
            color: $secondary-color;
            color: $blue-dark;
            display: block;
            font-size: 14px;
            margin-bottom: 13px;
            font-weight: 600;

            &:empty {
                display: none;
            }
        }

        &__textarea {
            border: 2px solid $light;
            width: 100%;
            font-size: 14px;
            border-radius: 5px;
            box-shadow: 0px 0px 11px 1px rgba(233,236,240,0);
            font-family: "Roboto";
            transition: box-shadow .3s ease-in-out;
            padding: 15px;
            outline: none;

            &:focus,
            &:active {
                box-shadow: 0px 0px 11px 1px #e9ecf0;
            }

            &::placeholder {
                color: $secondary-color;
            }
        }
    }
</style>