<template>
    <transition tag="div" name="v-notification-animate">
        <div class="notification" :class="type">
            <span class="notification__message">{{message}}</span>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: '',
            required: true
        },
        type: {
            type: String,
            default: '',
            required: false
        },
        timeout: {
            type: Number,
            default: 1000,
            required: false
        }
    },


    mounted() {
        setTimeout(() => {
            this.$emit('closeNotification');
        }, this.timeout);
    },
}
</script>