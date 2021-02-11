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