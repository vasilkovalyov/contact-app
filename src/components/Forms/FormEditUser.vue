<template>
    <form class="form-profile">
        <div class="df-row">
            <div class="col col-4">
                <div class="profile-photo">
                    <span class="profile-photo__caption">Profile Photo</span>
                    <ImageUpload 
                        name="image-user"
                        :image="userForm.image"
                        @imageUploadHandler="imageUploadHandler"
                    />
                </div>
            </div>
            <div class="col col-8">
                <div class="profile-info" >
                    <div class="profile-info__header">
                        <span class="profile-info__caption">Your Profile</span>
                        <div class="btn-wrap">
                            <FormButton :buttonClass="['btn__primary']" @clickHandler="handleClickSave" :loader="loader">Save</FormButton>
                        </div>
                    </div>
                    <div class="profile-info__category">
                        <span class="profile-info__category-title">BASICS</span>
                    </div>
                    <div class="profile-info__form" v-if="userForm">
                        <div class="df-row">
                            <div class="col col-6">
                                <InputField
                                    v-model="userForm.name" 
                                    name="name" 
                                    placeholder="Input name" 
                                    :hasIcon="true"
                                >
                                    <template v-slot:input-icon>
                                        <i class="fas fa-user"></i>
                                    </template>
                                    <template v-slot:label>Name</template>
                                </InputField>
                            </div>
                            <div class="col col-6">
                                <InputField
                                    v-model="userForm.nickname" 
                                    name="nickname" 
                                    placeholder="Input nickname" 
                                    :hasIcon="true"
                                >
                                    <template v-slot:input-icon>
                                        <i class="fas fa-user"></i>
                                    </template>
                                    <template v-slot:label>Nickname</template>
                                </InputField>
                            </div>
                            <div class="col col-6">
                                <InputField
                                    v-model="userForm.email" 
                                    name="email" 
                                    placeholder="Input email" 
                                    :hasIcon="true"
                                >
                                    <template v-slot:input-icon>
                                        <i class="fas fa-envelope"></i>
                                    </template>
                                    <template v-slot:label>Email</template>
                                </InputField>
                            </div>
                            <div class="col col-6">
                                <FormDatepicker
                                    v-model="userForm.date" 
                                    :value="userForm.date" 
                                    name="date" 
                                    placeholder="Input email"
                                    :hasIcon="true"
                                >
                                    <template v-slot:input-icon>
                                        <i class="fas fa-envelope"></i>
                                    </template>
                                    <template v-slot:label>Date</template>
                                </FormDatepicker>
                            </div>
                            <div class="col col-6">
                                <FormSelect 
                                    v-model="userForm.gender"
                                    :value="userForm.gender"
                                    name="gender" 
                                    baseOption="Select gender" 
                                    :options="genderArray"
                                    :hasIcon="true"
                                    typeGetOptions="values"
                                    @onChange="onChangeSelect"
                                >
                                    <template v-slot:label>Gender</template>
                                </FormSelect>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>

    import ImageUpload from '../ImageUpload';
    import InputField from '../FormsComponents/InputField';
    import FormButton from '../FormsComponents/FormButton';
    import FormSelect from '../FormsComponents/FormSelect';
    import FormDatepicker from '../FormsComponents/FormDatepicker';

    export default {
        name: 'FormEditUser',

        props: ['user', 'keyUser'],

        data() {
            return {
                userForm: {...this.user},
                loader: false,
                genderArray: [
                    {'code': 'male', 'label': 'male'},
                    {'code': 'female', 'label': 'female'},
                ]
            }
        },

        methods: {
            async handleClickSave() {

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
            },

            onChangeSelect(gender) {
                this.userForm = {
                    ...this.userForm,
                    gender
                }
            },
        },

        components: {
            InputField,
            ImageUpload,
            FormButton,
            FormSelect,
            FormDatepicker
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