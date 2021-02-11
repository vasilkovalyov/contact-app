<template>
    <section class="section-admin-default">
        <div class="container">
            <AdminSectionHeader>
                <template v-slot:title>Create User</template>
            </AdminSectionHeader>
            <div class="section-admin-default__body">
                <FormCreateUser @initNotification="initNotification" />
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
    </section>
</template>

<script>
    import FormCreateUser from '@/components/Forms/FormCreateUser';
    import Notification from '@/components/Notification';
    import AdminSectionHeader from '@/components/AdminSectionHeader';

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
            Notification,
            AdminSectionHeader
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