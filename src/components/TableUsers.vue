<template>
    <div class="table-user-wrapper">
        <div class="table-user-wrapper__header">
            <span class="table-user-wrapper__caption">Users</span>
            <template v-if="selectedUsers.length === 1">
                <div class="table-user-buttons-config">
                    <div class="table-user-buttons-config__btn-wrap">
                        <router-link  :to="'/edit/'+selectedUsers[0]" class="table-user__btn table-user__btn-edit">Edit user</router-link>
                        <button class="table-user__btn table-user__btn-remove" @click.prevent="removeHandleClick(selectedUsers[0])">Remove user</button>
                    </div>
                </div>
            </template>
        </div>
        <table class="table-users">
            <thead class="table-users__header">
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
                <tbody class="table-users__body"  v-for="user in users" :key="user.key">
                    <tr class="table-user">
                        <td>
                            <input :value="user.key" v-model="selectedUsers" type="checkbox">
                        </td>
                        <td>
                            <router-link :to="'/edit/'+user.key">
                                <template v-if="user.image">
                                    <img :src="user.image" :alt="user.name" class="table-user__image">
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
                        <td class="table-user__gender">
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

        selected() {

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
    .table-user-buttons-config {
        &__btn-wrap {
            display: flex;
            align-items: center;
        }
    }

    .table-user-wrapper {
        &__header {
            padding: 20px 40px 20px 30px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__caption {
            color: #525F7F;
            font-weight: 500;
            display: block;
        }
    }

    .table-users {
        border-collapse: collapse;
        width: 100%;
        font-size: 14px;

        &__header {
            font-size: 10px;
            text-transform: uppercase;
            color: #9DACC0;
            background-color: #F6F9FC;
            font-weight: 600;
            border-bottom: 1px solid #E9ECEF;

            td {
                text-align: left;
                padding: 16px 31px 14px;
            }
        }

        &__body {
            td {
                font-size: 14px;
                color: #525F7F;
                padding: 16px 31px;
            }
        }
    }

    .table-user {
        &__btn-wrap {
            text-align: center;
            width: 120px;
        }

        .fa-user {
            display: inline-block;
            width: 35px;
            text-align: center;
        }

        &__image {
            display: inline-block;
            align-items: center;
            vertical-align: middle;
            width: 35px;
            min-width: 35px;
            height: 35px;
            overflow: hidden;
            margin-right: 15px;
            border-radius: 50%;
        }

        &__btn {
            color: #ffffff;
            border: none;
            outline: none;
            border-radius: 4px;
            margin: 0 4px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s linear;
            background-color:#4b9da5;
            padding: 8px 12px;
            cursor: pointer;

            &:hover {
                background-color: darken(#4b9da5, 20%);
            }
        }

        .btn-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .gender {
        display: inline-block;
        width: 100px;
        text-transform: capitalize;
    }
</style>