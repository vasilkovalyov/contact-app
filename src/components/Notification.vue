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

<style lang="scss">
    .notification {
        position: absolute;
        top: 100px;
        right: 50px;
        padding: 12px;
        border-radius: 4px;
        color: #ffffff;
        font-size: 14px;

        &.successfull {
            background-color: #28a745;
        }

        &.error {
            background-color: #c82333;
        }

        
    }

    .v-notification-animate {
        &-enter {
            transform: translateX(120px);
            opacity: 0;
        }
        &-enter-active {
            transition: all .6s ease;
        }
        &-enter-to {
            opacity: 1;
        }
        &-leave {
            opacity: 1;
        }
        &-leave-active {
            transition: transform .6s ease, opacity .6s, height .6s .2s;
        }
        &-leave-to {
            transform: translateX(120px);
            opacity: 0;
        }
        &-move {
            transition: transform .6s ease;
        }
    }

    
</style>