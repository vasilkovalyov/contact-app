<template>
    <div class="progress">
        <div class="progress__head">
            <slot name="title"></slot>
            <span> {{targetPage}} / {{totalPages}}</span>
        </div>
        <div class="progress__line-wrap">
            <span class="progress__line" :style="{ width: getProgress + '%' }"></span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Progress',

    props: ['targetPage','totalPages'],

    data() {
        return {}
    },

    computed: {
        getProgress() {
            return (100 / this.totalPages) * this.targetPage
        }
    }
}
</script>

<style lang="scss">
    .progress {
        max-width: 280px;
        width: 100%;

        &__head {
            text-transform: uppercase;
            color: #2FB0F9;
            margin-bottom: 10px;
            font-weight: 600;
        }

        &__line-wrap {
            background-color: #319FFA;
            height: 6px;
            width: 100%;
            position: relative;
        }

        &__line {
            background-color: #FDDF54;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            transition: width 0.3s linear;
        }
    }
</style>