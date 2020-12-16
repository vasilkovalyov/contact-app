<template>
    <button 
        class="btn"
        :class="{ 'btn__loader': loader }"
        :disabled="loader"
        @click="onClick" 
    >{{text}}</button>
</template>

<script>

export default {
    props: {
        text: {
            type: String,
            default: 'button',
            required: true
        },

        loader: {
            type: Boolean,
            default: false,
            required: false,
        }
    },

    methods: {
        onClick(e) {
            e.preventDefault();
            this.$emit('clickHandler');
        }
    }
}

</script>

<style lang="scss" scoped>
    .btn {
        display: inline-block;
        position: relative;
        background-color: #57c7bb;
        border: none;
        color: #ffffff;
        border-radius: 20px;
        padding: 7px 20px;
        outline: none;
        font-size: 12px;
        min-width: 100px;
        cursor: pointer;
        box-shadow: 0 3px 12px 0 rgba(#171f2c, 0.75);
        transition: 0.3s box-shadow linear, 0.3s background-color linear;

        &:focus,
        &:active {
            box-shadow: 0 0 0 0 rgba(#171f2c, 0.75);
        }

        &:hover {
            background-color: darken(#57c7bb, 10%);
        }

        &__loader {
            color: transparent;

            &:after {
                content: '';
                position: absolute;
                top: 30%;
                left: 43%;
                transform: translate(-50%, -50%);
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