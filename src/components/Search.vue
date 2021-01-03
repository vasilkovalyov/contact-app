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

<style lang="scss">
    .search {
        max-width: 265px;
        width: 100%;
        display: flex;

        label {
            position: relative;
            width: 100%;
        }

        &__input {
            outline: none;
            transition: box-shadow .3s ease-in-out;
            width: 100%;
            border: 2px solid #E9ECEF;
            font-size: 14px;
            border-radius: 5px;
            box-shadow: 0px 0px 11px 1px rgba(233,236,240,0);
            padding: 5px 40px 5px 10px;
            height: 40px;
        }

        &__btn {
            transition: color .3s ease-in-out,background-color .3s ease-in-out;
            position: absolute;
            top: 5px;
            right: 5px;
            bottom: 5px;
            width: 30px;
            border-radius: 5px;
            color: #9DACC0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: transparent;
            border: none;

            &:hover {
                cursor: pointer;
                color: #fff;
                background-color: #4b9da5;
            }
        }
    }
</style>