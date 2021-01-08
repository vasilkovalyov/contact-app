<template>
    <div class="edit-user-page">
        <ProfileBanner 
            captionBanner="User"
            :userName="getUserName"
            typePage="User profile"
            image="user-profile-image.jpg"
        />
        <section class="section-edit-user">
            <div class="container">
                <div class="section-edit-user__content" v-if="loader">
                    <FormEditUser 
                        :user="user" 
                        :keyUser="$route.params.id"
                        @initNotification="initNotification"  
                    />
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

import FormEditUser from '../components/Forms/FormEditUser';
import Notification from '../components/Notification';
import ProfileBanner from '../components/ProfileBanner';

export default {
    name: 'EditUser',

    data() {
        return {
            loader: false,
            user: null,
            notification: {
                message: '',
                type: ''
            },
            isShowNotification: false
        }
    },

    methods: {
        ...mapActions(['userById']),

        closeNotification() {
            this.isShowNotification = false;
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
        }
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
        FormEditUser,
        Notification,
        ProfileBanner
    },

    async mounted() {
        await this.$store.dispatch('userById', this.$route.params.id);
        if(this.getTargetEditUser) {
            this.user = this.getTargetEditUser;
            this.loader = true;
        }
    },
}

</script>
<style lang="scss">
    
</style>