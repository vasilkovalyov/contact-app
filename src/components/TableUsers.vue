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
        <tbody class="table-users__body" v-for="(user, i) in users" :key="i">
            <tr class="table-user">
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.nickname}}</td>
                <td>{{user.birthday}}</td>
                <td>
                    <span class="gender" :class="user.gender === 'male' ? 'gender__male' : 'gender__female'"  >{{user.gender}}</span>
                </td>
                <td class="table-user__btn-wrap">
                    <button class="table-user__btn table-user__btn-edit">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="table-user__btn table-user__btn-remove">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>


export default {
    data: () => ({
        users: [
            {
                name: 'Aglae Hartman',
                email: 'anderson84@example.com',
                nickname: 'DIGNISSIMOS',
                birthday: '17/03/2004',
                gender: 'male'
            },
            {
                name: 'Alden Willkinson',
                email: 'norris.emard@example.com',
                nickname: 'TEMPORE',
                birthday: '24/12/2002',
                gender: 'female'
            },
            {
                name: 'Albina Yundt',
                email: 'auer.ottilie@example.net',
                nickname: 'CONSEQUATUR',
                birthday: '29/11/1987',
                gender: 'female'
            },
            {
                name: 'Alejandrin Walker',
                email: 'kuhlman.mark@example.net',
                nickname: 'SIT',
                birthday: '13/05/2000',
                gender: 'male'
            }
        ]
    }),

    computed: {
        classGender() {
            return {
                active:  'male'
            }
        }
    }

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
    }
</style>