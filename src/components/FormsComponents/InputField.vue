<template>
    <div class="input-component">
            <label class="input-field__label">
                <slot name='label'></slot>
            </label>
            <router-link tag="a" :to="link" class="input-component__help-link">{{linkName}}</router-link>
            <div class="input-field">
                <div class="input-field__icon">
                    <slot name='input-icon' class="input-field__icon"></slot>
                </div>
                <input 
                    :type="type" 
                    :name="name" 
                    :placeholder="placeholder" 
                    class="input-field__input"
                    :value="value"
                    @blur="inputHandler($event.target.value)"
                >
            </div>
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
        }
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

    .input-component {
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

            &:hover {
                color: darken($primary-color, 20%);
            }
        }
    }

    .input-field {
        width: 100%;
        position: relative;

        &__label {
            color: $secondary-color;
            color: $blue-dark;

            display: block;
            font-size: 14px;
            margin-bottom: 13px;
        }

        &__input {
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

            &:focus,
            &:active {
                box-shadow: 0px 0px 11px 1px #e9ecf0;
            }

            &::placeholder {
                color: $secondary-color;
            }
        }

        &__icon {
            color: $secondary-color;

            position: absolute;
            top: 50%;
            left: 15px;
            transform: translateY(-50%);
        }


        
    }
</style>