<template>
    <div class="auth-profile-page">
        <section class="section-admin-banner" style="background-image: url(./images/admin-profile-image.jpg)">
            <div class="container">
                <h1>Admin - {{name}}</h1>
                <ul class="dashboard-breadcrumbs">
                    <li>Account settings</li>
                </ul>
            </div>
        </section>
        <section class="section-profile">
            <div class="container">
                <div class="form-admin-profile">
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
                            <div class="profile-info">
                                <div class="profile-info__header">
                                    <span class="profile-info__caption">Your Profile</span>
                                    <div class="btn-wrap">
                                        <FormButton :buttonClass="['btn__primary']" @clickHandler="handleClickSave" >Save</FormButton>
                                    </div>
                                </div>
                                <div class="profile-info__category">
                                    <span class="profile-info__category-title">BASICS</span>
                                </div>
                                <div class="profile-info__form">
                                    <div class="df-row">
                                        <div class="col col-6">
                                            <InputField
                                                v-model="userForm.firstName" name="first-name" placeholder="Name">
                                                <template v-slot:input-icon>
                                                    <i class="fas fa-user"></i>
                                                </template>
                                                <template v-slot:label>First Name</template>
                                            </InputField>
                                        </div>
                                        <div class="col col-6">
                                            <InputField
                                                v-model="userForm.lastName" name="last-name" placeholder="Name">
                                                <template v-slot:input-icon>
                                                    <i class="fas fa-user"></i>
                                                </template>
                                                <template v-slot:label>Last Name</template>
                                            </InputField>
                                        </div>
                                        <div class="col col-6">
                                            <InputField v-model="userForm.jobTitle" name="job" placeholder="Job Title">
                                                <template v-slot:input-icon>
                                                    <i class="fas fa-user-md"></i>
                                                </template>
                                                <template v-slot:label>Job Title</template>
                                            </InputField>
                                        </div>
                                        <div class="col">
                                            <InputField v-model="userForm.email" name="email" placeholder="Email">
                                                <template v-slot:input-icon>
                                                    <i class="fas fa-envelope"></i>
                                                </template>
                                                <template v-slot:label>Email</template>
                                            </InputField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="profile-info">
                                <div class="profile-info__category">
                                    <span class="profile-info__category-title">Security</span>
                                </div>
                                <div class="profile-info-password-form">
                                    <div class="df-row">
                                        <div class="col col-2">
                                            <span class="profile-info__caption">Change Password</span>
                                        </div>
                                        <div class="col col-10">
                                            <form class="confirm-password-form">
                                                <div class="confirm-password-form__input-wrapper">
                                                    <InputField 
                                                        v-model="securityDate.password" 
                                                        name="password" type="password" placeholder="Password" :inputClass="['input-component__md']">
                                                        <template v-slot:input-icon>
                                                            <i class="fas fa-lock"></i>
                                                        </template>
                                                    </InputField>
                                                </div>
                                                <div class="confirm-password-form__input-wrapper">
                                                    <InputField 
                                                        v-model="securityDate.confirmPassword" 
                                                        name="confirm-password" type="password" placeholder="Confirm Password" :inputClass="['input-component__md']">
                                                        <template v-slot:input-icon>
                                                            <i class="fas fa-lock"></i>
                                                        </template>
                                                    </InputField>
                                                </div>
                                                <div class="btn-wrap">
                                                    <button type="submit" class="btn accent-background btn__primary js-btn-save js-btn-save-password">Save</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import InputField from '../components/FormsComponents/InputField';
import FormButton from '../components/FormsComponents/FormButton';
import ImageUpload from '../components/ImageUpload';


export default {
    name: 'AdminProfile',
    props: ['user'],

    data() {
        return {
            name: 'Vasiliy',
            userForm: {...this.user},
            securityDate: {
                password: '',
                confirmPassword: ''
            }
        }
    },

    methods: {
        handleClickSave() {

        },

        imageUploadHandler() {

        }
    },

    components: {
        InputField,
        FormButton,
        ImageUpload,
    }
}

</script>

<style lang="scss">
    @import '../scss/base/variables.scss';

    .section-admin-banner {
        color: $white;

        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        padding: 92px 0 108px;
        margin-bottom: -74px;

        h1 {
            font-size: 36px;
        }
    }

    .dashboard-breadcrumbs {
        font-size: 14px;
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: inherit;
    }

    .form-admin-profile {
        > .df-row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -10px;

            > .col {
                padding: 0 15px;
                display: flex;
                width: 100%;

                &.col-4 {
                    width: 33.33%;
                }

                &.col-8 {
                    width: 66.66%;
                }
            }
        }
    }
    
    .profile-photo {
        border-radius: 5px;
        overflow: hidden;
        background-color: $white;
        padding: 30px;
        width: 100%;
        margin-bottom: 34px;
        box-shadow: 0px 0px 5px 0px rgba(233,236,239,0.85);

        &__caption {
            display: block;
            color: $secondary-color;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 27px;
            letter-spacing: 1px;
        }
    }

    .profile-info {
        border-radius: 5px;
        overflow: hidden;
        background-color: $white;
        width: 100%;
        margin-bottom: 34px;
        box-shadow: 0px 0px 5px 0px rgba(233,236,239,0.85);

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 23px 28px;
        }

        &__caption {
            display: block;
            color: $secondary-color;
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 0;
        }

        &__category {
            border-top: 1px solid $light;
            border-bottom: 1px solid $light;
            padding: 8px 31px;
            background-color: $light-4;
            
            &-title {
                font-size: 10px;
                color: $blue-light-1;
                font-weight: 600;
                text-transform: uppercase;
            }
        }

        &__form {
            padding: 25px 28px 10px;

            .df-row {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin: 0 -15px;
            }

            .col {
                padding: 0 15px;
                width: 100%;

                &.col-6 {
                    width: 50%;
                }
            }
        }
    }

    .profile-info-password-form {
        padding: 25px 28px;
        
        .df-row {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin: 0 -10px;
        }

        .col {
            padding: 0 17px;
            width: 100%;

            &.col-2 {
                width: 20%;
            }

            &.col-10 {
                width: 80%;
            }
        }
    }

    .confirm-password-form {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        &__input-wrapper {
            margin-right: 20px;
        }

        .input-component {
            margin-bottom: 0;
        }
    }
    

</style>