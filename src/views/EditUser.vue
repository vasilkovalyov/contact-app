<template>
    <section class="section-edit-user">
        <div class="container">
            <h1>Edit User</h1>
            <template v-if="loader">
                <FormEditUser 
                    :user="user" 
                    :keyUser="$route.params.id"
                    @saveUser="handleSubmit" 
                    @initNotification="initNotification"  
                />
            </template>
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
</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import FormEditUser from '../components/Forms/FormEditUser';
import Notification from '../components/Notification';


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

        handleSubmit(payload) {
            console.log(payload);
        },

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
        ...mapGetters(['getTargetEditUser'])
    },

    components: {
        FormEditUser,
        Notification
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
<style lang="scss" scoped>
    .section-edit-user {
        padding: 50px 0;
    }
</style>