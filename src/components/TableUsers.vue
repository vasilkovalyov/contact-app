<template>
    <table class="table-users">
        <thead class="table-users__head">
            <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Nickname</td>
                <td>Birthday</td>
                <td>Gender</td>
                <td></td>
            </tr>
        </thead>
        <template v-if="users.length > 0">
            <tbody class="table-users__body"  v-for="user in users" :key="user.key">
                <tr class="table-user">
                    <td>{{user.name}}</td>
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
                    <td class="table-user__btn-wrap">
                        <div class="btn-wrap">
                            <router-link  :to="'/edit/'+user.key" class="table-user__btn table-user__btn-edit">
                                <i class="fas fa-pen"></i>
                            </router-link>
                            <button class="table-user__btn table-user__btn-remove">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
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
</template>

<script>


export default {
    props: ['users'],

    computed: {

    },
    
}
</script>

<style lang="scss" scoped>
    .table-users {
        border-collapse: collapse;
        width: 100%;
        font-size: 14px;

        &__head {
            font-weight: 500;
        }

        td {
            padding: 5px 10px;
            border: 1px solid #9b9b9b;
        }
    }

    .table-user {
        &__btn-wrap {
            text-align: center;
            width: 120px;
        }

        &__btn {
            color: #ffffff;
            width: 30px;
            height: 30px;
            border: none;
            outline: none;
            border-radius: 4px;
            margin: 0 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s linear;

            &-edit {
                background-color: #eead53;

                &:hover {
                    background-color: darken(#eead53, 20%);
                }
            }

            &-remove {
                background-color: #d94f45;

                &:hover {
                    background-color: darken(#d94f45, 20%);
                }
            }
        }

        &__gender {
            text-align: center;
        }

        .btn-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .gender {
        display: inline-block;
        padding: 8px 12px;
        color: #ffffff;
        border-radius: 4px;
        margin: 0 auto;
        width: 100px;
        text-transform: capitalize;

        &__male {
            background-color: #59bcdb;
        }

        &__female {
            background-color: #56bc59;
        }
    }
</style>