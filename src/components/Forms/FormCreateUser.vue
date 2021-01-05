<template>
    <form class="form-create-user" @submit="submitForm">
        <div class="form-field">
            <InputField 
                v-model="formData.name"
                name="name" 
                placeholder="Input name" 
            />
            <InputField 
                v-model="formData.email"
                name="email" 
                placeholder="Input email" 
            />
            <InputField 
                v-model="formData.nickname"
                name="nickname" 
                placeholder="Input nickname" 
            />
            <SelectField 
                v-model="formData.gender"
                name="gender" 
                baseOption="Select gender" 
                :arrayOptions="genderArray"
            />
            <InputField 
                v-model="formData.date"
                name="date" 
                type="date" 
                placeholder="Input birthbay" 
            />
            <button class="form-btn form-btn__create" :class="{ 'btn__loader': loader }" >Create</button>
            <button type="reset" class="form-btn form-btn__reset">Reset</button>
        </div>
        
    </form>
</template>

<script>
    import InputField from '../FormsComponents/InputField';
    import SelectField from '../FormsComponents/SelectField';

    export default {
        data: () => ({
            formData: {
                name: null,
                email: null,
                nickname: null,
                gender: null,
                date: null,
            },
            loader: false,
            genderArray: [
                {'value': 'male'},
                {'value': 'female'},
            ]
        }),

        methods: {
            submitForm(e) {
                e.preventDefault();

                const formData = { ...this.formData };
            
                try {
                    this.loader = true;
                    this.$store.dispatch('createUser', formData)
                    this.$emit('initNotification', true);
                    this.loader = false;     
                    this.clearForm(this.formData);

                } catch(error) {
                    console.error(error.message);
                    this.$emit('initNotification', false);
                    this.loader = false;  
                }
            },

            clearForm(formData) {
                Object.keys(formData).forEach(function(key,index) {
                    formData[key] = '';
                });
            }
        },

        components: {
            InputField,
            SelectField
        }
    }
</script>

<style lang="scss" >
    .form-create-user {
        width: 100%;
        
        .input-field {
            &__input {
                color: #000000;
            }
        }
    }

    .form-btn {
        position: relative;
        padding: 10px 18px;
        border: none;
        outline: none;
        border-radius: 4px;
        margin-right: 10px;
        cursor: pointer;
        transition: background-color 0.3s linear, border-color 0.3s linear;

        &__create {
            color: #ffffff;
            background-color: #28a745;
            border-color: #28a745;

            &:hover {
                background-color: darken(#28a745, 20%);
            }

            &.btn__loader {
                color: transparent;
                pointer-events: none;

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

        &__reset {
            color: #fff;
            background-color: #c82333;
            border-color: #bd2130;

            &:hover {
                background-color: darken(#bd2130, 20%);
            }
        }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
</style>