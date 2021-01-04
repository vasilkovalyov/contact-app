<template>
    <section class="section-create-user">
        <div class="container">
            <h1>Create User</h1>
            <FormCreateUser 
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
    </section>
</template>

<script>
    import FormCreateUser from '../components/Forms/FormCreateUser';
    import Notification from '../components/Notification';

    export default {
        name: 'CreateUser',
        
        data() {
            return {
                notification: {
                    message: '',
                    type: ''
                },
                isShowNotification: false
            }
        },

        components: {
            FormCreateUser,
            Notification
        },

        methods: {
            closeNotification() {
                this.isShowNotification = false;
            },

            initNotification(flag) {
                this.isShowNotification = true;

                if(flag) {
                    this.notification.message = 'User create - Successfull',
                    this.notification.type = 'successfull'
                } else {
                    this.notification.message = 'User create - Error',
                    this.notification.type = 'error'
                }
            }
        }

        
    }
</script>

<style lang="scss">
    .section-create-user {
        padding: 20px 0;
    }

</style>