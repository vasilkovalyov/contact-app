<template>
    <div class="select-component" :class="[!hasIcon ? 'select-component__without-icon' : '']">
        <label class="select-field__label">
            <slot name='label'></slot>
        </label>
        <div class="select-field">
            <Selectize v-model="selected" :value="value" :settings="settings">
                <template>
                    <option value="">{{baseOption}}</option>
                </template>
                <template v-for="(option, key) in options" >
                    <option :value="option.value" :key="key">{{option.value}}</option>
                </template>
            </Selectize>
        </div>
    </div>
</template>
<script>
import Selectize from 'vue2-selectize'

export default {
    name: 'FormSelect',

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
        options: {
            type: Array,
            default: [],
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

    data() {
        return {
            settings: {}, 
            selected: this.value
        }
    },

    watch: {
        selected(value, oldValue) {
            this.$emit('input', value);
        }
    },

    components: {
        Selectize
    },
}
</script>
<style lang="scss">
    @import '../../scss/base/variables.scss';
    @import "~selectize/dist/css/selectize.bootstrap3.css";

    .select-component {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 18px;

        &__help-link {
            color: $primary-color;
            
            font-size: 14px;
            margin-bottom: 13px;
            transition: color 0.3s linear;

            &:empty {
                display: none;
            }

            &:hover {
                color: darken($primary-color, 20%);
            }
        }

        &__without-icon {
            .select-field {
                .selectize-input {
                    padding-left: 15px;
                    padding-right: 15px;
                    
                    &:before {
                        display: none;
                    }
                }
            }
        }
    }

    .select-field {
        width: 100%;
        position: relative;
        margin-bottom: 0;

        &__label {
            color: $secondary-color;
            color: $blue-dark;
            display: block;
            font-size: 14px;
            margin-bottom: 13px;
            font-weight: 600;
            text-transform: capitalize;

            &:empty {
                display: none;
            }
        }

        .selectize-input,
        &__input {
            position: relative;
            border: 2px solid $light;
            width: 100%;
            font-size: 14px;
            border-radius: 5px;
            box-shadow: 0px 0px 11px 1px rgba(233,236,240,0);
            font-family: "Roboto";
            transition: box-shadow .3s ease-in-out;
            height: 48px;
            padding: 15px 45px;
            outline: none;
            display: flex;
            align-items: center;

            &:focus,
            &:active {
                box-shadow: 0px 0px 11px 1px #e9ecf0;
            }

            &::placeholder {
                color: $secondary-color;
            }

            &:before {
                content: "\f228";
                font-family: "Font Awesome 5 Free";
                display: inline-block;
                font-weight: 900;
                color: $blue-light-1;
                position: absolute;
                top: 50%;
                left: 15px;
                right: auto;
                bottom: auto;
                height: auto;
                transform: translateY(-50%);
                font-size: 14px;
            }
        }

        .selectize-dropdown {
            font-size: 14px;
        }
    }
</style>