<template>
    <button class="btn"
        :disabled="loader"
        @click.prevent="onClick" 
    >
        <slot></slot>
        <span v-if="loader" class="btn__loader"></span>
    </button>
</template>

<script>



export default {
    props: {
        loader: {
            type: Boolean,
            default: false,
            required: false,
        }
    },

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
        background-color: $primary-color;
        color: $white;

        position: relative;
        text-align: center;
        width: 100%;
        border: none;
        outline: none;
        padding: 15px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color .3s ease-in-out;

        &:hover {
            background-color: darken($primary-color, 10%);
        }

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
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

</style>