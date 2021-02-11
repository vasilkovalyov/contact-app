<template>
    <div class="select-component" :class="[!hasIcon ? 'select-component__without-icon' : '']">
        <label class="select-field__label">
            <slot name='label'></slot>
        </label>
        <div class="select-field">
            <v-select
                :filterable="false"
                :searchable="false"
                v-model="selected"
                :options="options"
                @input="setSelected"
            ></v-select>
        </div>
    </div>
</template>
<script>

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
    name: 'FormSelect',

    props: {
        name: {
            type: String,
            default: 'Select',
            required: false
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
        options: {
            type: Array,
            default: [],
            required: false
        },
        hasIcon: {
            type: Boolean,
            default: false,
            required: false
        },
        value: {
            type: String,
            default: '',
            required: false
        },
        typeGetOptions: {
            type: String,
            default: 'entries',
            required: false
        }
    },


    methods: {
        setSelected(value) {
            switch(this.typeGetOptions) {
                case 'entries' : {
                    this.$emit('onChange', value);  
                    break;
                }
                case 'keys' : {
                    this.$emit('onChange', value.code);  
                    break;
                }
                case 'values' : {
                    this.$emit('onChange', value.label);  
                    break;
                }
                default: {
                    return 0;
                }
            }
        },
    },

    async mounted() {
        this.selected = await this.value;
    },

    data() {
        return {
            settings: {}, 
            selected: null 
        }
    },


    components: {
        vSelect,
    },
}
</script>