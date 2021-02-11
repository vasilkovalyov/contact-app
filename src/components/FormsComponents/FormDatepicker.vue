<template>
    <div class="datepicker-component" :class="[!hasIcon ? 'datepicker-component__without-icon' : '']">
        <label class="datepicker-field__label">
            <slot name='label'></slot>
        </label>
        <div class="datepicker-field">
            <Datepicker 
                :value="value"
                :name="name"
                format="yyyy-MM-dd"
                @selected="changeDate"
            />
        </div>
    </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';

export default {
    name: 'FormDatePicker',

    props: {
        name: {
            type: String,
            default: 'Date',
            required: false
        },
        label: {
            type: String,
            default: null,
            required: false
        },
        placeholder: {
            type: String,
            default: 'Select date',
            required: false
        },
        value: {
            type: String,
            default: '',
            required: false
        },
        hasIcon: {
            type: Boolean,
            default: false,
            required: false
        },
    },

    date() {
        return {
        }
    },

    methods: {
        changeDate(value) {
            this.$emit('input', new Date(value).toISOString().split('T')[0]);
        }
    },

    components: {
        Datepicker
    },
}
</script>