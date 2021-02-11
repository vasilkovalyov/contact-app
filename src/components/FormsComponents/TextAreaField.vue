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