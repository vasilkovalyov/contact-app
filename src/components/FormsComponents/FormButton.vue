<template>
    <button class="btn" @click="onClick">{{text}}</button>
</template>

<script>

export default {
    props: {
        text: {
            type: String,
            default: 'button',
            required: true
        },
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
    }
</style>