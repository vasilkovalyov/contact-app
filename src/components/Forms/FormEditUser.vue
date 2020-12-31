<template>
    <form class="form-edit-user" >
        <ImageUpload 
            name="image-user"
            :image="userForm.image"
            @imageUploadHandler="imageUploadHandler"
        />
        <InputField 
            v-model="userForm.name"
            name="name" 
            placeholder="Input name" 
        />
        <InputField 
            v-model="userForm.email"
            name="email" 
            placeholder="Input email" 
        />
        <InputField 
            v-model="userForm.nickname"
            name="nickname" 
            placeholder="Input nickname" 
        />
        <SelectField 
            v-model="userForm.gender"
            :value="userForm.gender"
            name="gender" 
            baseOption="Select gender" 
            :arrayOptions="genderArray"
        />
        <InputField 
            v-model="userForm.date"
            name="date" 
            type="date" 
            placeholder="Input birthbay" 
        />
        <button class="form-btn form-btn__save" :class="{ 'btn__loader': loader }" @click.prevent="submitForm">Save</button>
    </form>
</template>

<script>

    import ImageUpload from '../ImageUpload';
    import InputField from '../FormsComponents/InputField';
    import SelectField from '../FormsComponents/SelectField';

    export default {
        name: 'FormEditUser',

        props: ['user', 'keyUser'],

        data() {
            return {
                userForm: {...this.user},
                loader: false,
                genderArray: [
                    {'value': 'male'},
                    {'value': 'female'},
                ]
            }
        },

        methods: {
            async submitForm(e) {
                e.preventDefault();

                const formData = { ...this.userForm };

                try {
                    this.loader = true;
                    await this.$store.dispatch('saveUser', {
                        user: formData,
                        key: this.keyUser
                    })
                    this.$emit('initNotification', true);
                    this.loader = false;     

                } catch(error) {
                    console.log(error);
                    this.$emit('initNotification', false);
                    this.loader = false;  
                }
            },

            imageUploadHandler(image) {
                this.userForm = {
                    ...this.userForm,
                    image
                }
            }
        },

        components: {
            InputField,
            SelectField,
            ImageUpload
        }
    }
</script>

<style lang="scss" deep>
    .form-edit-user {
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

        &__save {
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