<template>
    <div class="table-wrapper">
        <table class="table">
            <thead class="table__header">
                <tr>
                    <td>Select</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Nickname</td>
                    <td>Birthday</td>
                    <td>Gender</td>
                </tr>
            </thead>
            <template v-if="users.length > 0">
                <tbody class="table__body"  >
                    <tr v-for="user in users" :key="user.key">
                        <td>
                            <input :value="user.key" v-model="selectedUsers" type="checkbox">
                        </td>
                        <td>
                            <router-link :to="'/admin/edit/'+user.key">
                                <template v-if="user.image">
                                    <img :src="user.image" :alt="user.name" class="table__image">
                                </template>
                                <template v-else>
                                    <i class="fas fa-user"></i>
                                </template>
                                <span>{{user.name}}</span>
                            </router-link>
                        </td>
                        <td>{{user.email}}</td>
                        <td>{{user.nickname}}</td>
                        <td>{{user.date}}</td>
                        <td class="table__gender">
                            <span class="gender" :class="user.gender === 'male' ? 'gender__male' : 'gender__female'"  >
                                <template v-if="user.gender === 'male'">
                                    <i class="fas fa-star"></i>
                                </template>
                                <template v-else>
                                    <i class="fas fa-heart"></i>
                                </template>
                                {{user.gender}}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </template>
            <template v-else>
                <tbody>
                    <tr>
                        <td colspan="6">
                            <span>Users not a found</span>
                        </td>
                    </tr>
                </tbody>
            </template>
        </table>
        <template v-if="isShowNotification">
            <Notification
                :message="notification.message"
                :type="notification.type"
                :timeout="2000"
                @closeNotification="closeNotification"
            />
        </template>
    </div>
    
</template>

<script>

import Notification from './Notification';
import { mapActions } from 'vuex';

export default {
    props: ['users'],

    data() {
        return {
            notification: {
                message: '',
                type: ''
            },
            isShowNotification: false,
            selectedUsers: [],
        }
    },

    components: {
        Notification
    },

    methods: {
        ...mapActions(['removeUser']),

        async removeHandleClick(idUser) {
            try {
                await this.removeUser(idUser);
                this.initNotification(true);
            } catch(e) {
                this.initNotification(false);
                console.log(e);
            }
        },

        closeNotification() {
            this.isShowNotification = false;
        },

        initNotification(flag) {
            this.isShowNotification = true;

            if(flag) {
                this.notification.message = 'User remove - Successfull',
                this.notification.type = 'successfull'
            } else {
                this.notification.message = 'User remove - Error',
                this.notification.type = 'error'
            }
        }
    }
    
}
</script>

<style lang="scss">
    .table-buttons-config {
        &__btn-wrap {
            display: flex;
            align-items: center;
        }
    }

    .gender {
        display: inline-block;
        width: 100px;
        text-transform: capitalize;
    }
</style>