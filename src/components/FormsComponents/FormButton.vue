<template>
    <button :type="typeButton" class="btn" :class="buttonClass ? buttonClass : []"
        :disabled="loader"
        @click.prevent="onClick" 
    >
        <slot></slot>
        <span v-if="loader" class="btn__loader"></span>
    </button>
</template>

<script>



export default {
    props: ['loader', 'buttonClass', 'typeButton'],

    methods: {
        onClick(e) {
            this.$emit('clickHandler');
        }
    }
}

</script>

<style lang="scss">
    @import '../../scss/base/variables.scss';

    .btn {
        color: $white;

        position: relative;
        text-align: center;
        border: none;
        outline: none;
        padding: 9px 15px;
        border-radius: 5px;
        font-size: 14px;
        min-width: 120px;
        cursor: pointer;
        transition: background-color .3s ease-in-out;

        &__loader {
            color: transparent;
            position: relative;
            left: 10px;

            &:after {
                content: '';
                position: relative;
                display: inline-block;
                border: 2px solid #394b63;
                border-top: 2px solid #ffffff;
                border-radius: 50%;
                width: 14px;
                height: 14px;
                animation: spin 1s linear infinite;
            }
        }

        &__primary {
            background-color: $primary-color;

            &:hover {
                background-color: $blue-dark-1;
            }
        }

        &__secondary {
            background-color: $blue-light-1;
            
            &:hover {
                background-color: $blue-dark-1;
            }
        }

        &__wide {
            width: 100%;
            padding: 15px;
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>