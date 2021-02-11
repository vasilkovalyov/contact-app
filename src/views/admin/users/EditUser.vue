<template>
    <div class="edit-user-page">
        <AdminBanner 
            captionBanner="User"
            :userName="getUserName"
            typePage="User profile"
            image="user-profile-image.jpg"
        />
        <section class="section-profile">
            <div class="container">
                <div class="section-profile__content">
                    <div class="section-profile__row">
                        <div class="section-profile__col section-profile__col-4">
                            <div class="profile-panel profile-photo">
                                <span class="profile-panel__caption profile-photo__caption">Profile Photo</span>
                                <template v-if="loader">
                                    <ImageUpload 
                                        name="image-user"
                                        :image="user.image"
                                        @imageUploadHandler="imageUploadHandler"
                                    />
                                </template>
                            </div>
                        </div>
                        <div class="section-profile__col section-profile__col-8">
                            <div class="profile-panel" >
                                <div class="profile-panel__header">
                                    <span class="profile-panel__caption">Your Profile</span>
                                    <div class="btn-wrap">
                                        <FormButton :buttonClass="['v-btn__primary']" @clickHandler="handleClickSave" :loader="loaderBtn">Save</FormButton>
                                    </div>
                                </div>
                                <div class="profile-panel__category">
                                    <span class="profile-panel__category-title">BASICS</span>
                                </div>
                                <div class="profile-panel__form" v-if="user">
                                    <div class="profile-panel__row">
                                        <div class="profile-panel__col profile-panel__col-6">
                                            <InputField
                                                v-model="user.name" 
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
                                        <div class="profile-panel__col profile-panel__col-6">
                                            <InputField
                                                v-model="user.nickname" 
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
                                        <div class="profile-panel__col profile-panel__col-6">
                                            <InputField
                                                v-model="user.email" 
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
                                        <div class="profile-panel__col profile-panel__col-6">
                                            <FormDatepicker
                                                v-model="user.date" 
                                                :value="user.date" 
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
                                        <div class="profile-panel__col profile-panel__col-6">
                                            <FormSelect 
                                                v-model="user.gender"
                                                :value="user.gender"
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
                </div>
                <template v-if="isShowNotification">
                    <Notification
                        :message="notification.message"
                        :type="notification.type"
                        :timeout="2000"
                        @closeNotification="closeNotification"
                    />
                </template>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Notification from '@/components/Notification';
import AdminBanner from '@/components/AdminBanner';

import ImageUpload from '@/components/ImageUpload';
import InputField from '@/components/FormsComponents/InputField';
import FormButton from '@/components/FormsComponents/FormButton';
import FormSelect from '@/components/FormsComponents/FormSelect';
import FormDatepicker from '@/components/FormsComponents/FormDatepicker';

export default {
    name: 'EditUser',

    data() {
        return {
            keyUser: null,
            loader: false,
            loaderBtn: false,
            user: null,
            genderArray: [
                {'code': 'male', 'label': 'male'},
                {'code': 'female', 'label': 'female'},
            ],
            notification: {
                message: '',
                type: ''
            },
            isShowNotification: false,
        }
    },

    async mounted() {
        this.keyUser = this.$route.params.id;
        await this.$store.dispatch('userById', this.keyUser);
        if(this.getTargetEditUser) {
            this.user = this.getTargetEditUser;
            this.loader = true;
        }
    },

    methods: {
        ...mapActions(['userById']),

        async handleClickSave() {
            const formData = { ...this.user };

            try {
                this.loaderBtn = true;
                await this.$store.dispatch('saveUser', {
                    user: formData,
                    key: this.keyUser
                })
                this.initNotification(true);
                this.loaderBtn = false;     

            } catch(error) {
                console.log(error);
                this.initNotification(false);
                this.loaderBtn = false;  
            }
        },

        imageUploadHandler(image) {
            this.user = {
                ...this.user,
                image
            }
        },

        onChangeSelect(gender) {
            this.user = {
                ...this.user,
                gender
            }
        },

        initNotification(flag) {
            this.isShowNotification = true;

            if(flag) {
                this.notification.message = 'User save - Successfull',
                this.notification.type = 'successfull'
            } else {
                this.notification.message = 'User save - Error',
                this.notification.type = 'error'
            }
        },

        closeNotification() {
            this.isShowNotification = false;
        },
    },
    
    computed: {
        ...mapGetters(['getTargetEditUser']),

        getUserName() {
            if(this.loader) {
                return this.user.name;
            }
        }
    },

    components: {
        Notification,
        AdminBanner,
        InputField,
        ImageUpload,
        FormButton,
        FormSelect,
        FormDatepicker
    },
}
</script>