<template>
    <button :type="typeButton" class="v-btn" :class="buttonClass ? buttonClass : []"
        :disabled="loader"
        @click.prevent="onClick" 
    >
        <slot></slot>
        <span v-if="loader" class="btn__loader"></span>
    </button>
</template>

<script>



export default {
    name: 'FormButton',
    
    props: ['loader', 'buttonClass', 'typeButton'],

    methods: {
        onClick(e) {
            this.$emit('clickHandler');
        }
    }
}

</script>