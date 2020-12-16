<template>
    <div class="search">
        <label>
            <span class="search__label-text">{{label}}</span>
            <input type="text" class="search__input" v-model="inputValue">
        </label>
        <div class="search__btn-wrap">
            <button class="search__btn search__btn-submit" @click.prevent="handleClickSearch">Go</button>
            <button class="search__btn search__btn-reset" @click.prevent="handleClickReset">Reset</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
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

        handleClickReset() {
            this.inputValue = '';
            this.$emit('handleClickSearch', '');
        }
    }
}
</script>

<style lang="scss" scoped>
    .search {
        display: flex;

        &__label-text {
            font-size: 14px;
            margin-right: 10px;
            font-weight: 500;
        }

        &__input {
            border-radius: 3px;
            padding: 4px 10px;
            border: 1px solid #9b9b9b;
            outline: none;
            margin-right: 4px;
            height: 32px;
        }

        &__btn-wrap {
            display: flex;
        }

        &__btn {
            outline: none;
            margin-right: 5px;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            padding: 4px 14px;
            transition: color 0.3s linear, background-color 0.3s linear,;

            &-submit {
                color: #fff;
                background-color: #007bff;
                border-color: #007bff;

                &:hover {
                    background-color: darken(#007bff, 20%);
                }
            }

            &-reset {
                background-color: #ffffff;
                border: 1px solid #3a3434;

                &:hover {
                    color: #ffffff;
                    background-color: darken(#3a3434, 20%);
                }
            }
        }
    }
</style>