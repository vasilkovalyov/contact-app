<template>
    <div class="input-component" 
        :class="[
            sizeInput ? 'input-component__'+sizeInput : '', 
            !hasIcon ? 'input-component__without-icon' : ''
        ]">
        <label class="input-field__label">
            <slot name='label'></slot>
        </label>
        <router-link tag="a" :to="link" class="input-component__help-link">{{linkName}}</router-link>
        <div class="input-field">
            <div class="input-field__icon" v-if="hasIcon">
                <slot name='input-icon' class="input-field__icon"></slot>
            </div>
            <input 
                :type="type" 
                :name="name" 
                :placeholder="placeholder" 
                class="input-field__input"
                :value="value"
                :disabled="disabled"
                @blur="inputHandler($event.target.value)"
            >
        </div>
    </div>
</template>
<script>

export default {
    name: 'InputField',
    props: {
        name: {
            type: String,
            default: 'text',
            required: false
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
        },
        link: {
            type: String,
            default: '',
            required: false
        },
        linkName: {
            type: String,
            default: '',
            required: false
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
        hasIcon: {
            type: Boolean,
            default: false,
            required: false
        },
        sizeInput: {
            type: String,
            default: '',
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