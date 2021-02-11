<template>
    <div class="search">
        <label>
            <input type="text" class="search__input" v-model="inputValue" :placeholder="placeholder">
            <button class="search__btn" @click.prevent="handleClickSearch">
                <i class="fas fa-search"></i>
            </button>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: 'Input',
            required: false
        },
    },

    data: () => ({
        inputValue: ''
    }),

    methods: {
        handleClickSearch() {
            this.$emit('handleClickSearch', this.inputValue);
        },
    }
}
</script>