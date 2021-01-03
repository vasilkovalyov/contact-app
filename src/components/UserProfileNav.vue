<template>
    <div class="user-profile-nav">
        <div class="user-profile-nav__image">
            <img src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png" alt="">
        </div>
        <div class="user-profile-nav__info">
            <span class="user-profile-nav__name">{{user.displayName}}</span>
        </div>
        <div class="user-profile-nav__dropdown">
            <ul>
                <li>
                    <router-link to="/admin-profile">
                        <i class="fas fa-user"></i>
                        <span>View profile</span>
                    </router-link>
                </li>
                <li>
                    <a href="#" @click.prevent="signOut">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Sign out</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'UserProfileNav',

    props: ['user'],

    methods: {
        async signOut() {
            try {
                await this.$store.dispatch('signOut')
                this.$router.push('/login');
            } catch(e) {}
        }
    }
}

</script>

<style lang="scss" scoped>
    .user-profile-nav {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
            .user-profile-nav__dropdown {
                opacity: 1;
                visibility: visible;
            }
        }

        &__image {
            width: 35px;
            min-width: 35px;
            height: 35px;
            overflow: hidden;
            display: flex;
            margin-right: 15px;
            border-radius: 50%;
        }

        &__info {
            font-size: 14px;
        }

        &__dropdown {
            transition: opacity .3s ease-in-out, visibility .3s ease-in-out;
            position: absolute;
            top: calc(100% + 15px);
            border-top: 3px solid #4b9da5;
            background-color: #fff;
            z-index: 10;
            opacity: 0;
            visibility: hidden;
            right: 0;
            width: 200px;
            font-size: 14px;
            right: 50%;
            transform: translateX(77%);

            ul {
                list-style-type: none;
                padding: 0;
                margin: 0;

                li {
                    padding: 11px 20px 11px 16px;

                    i {
                        margin-right: 10px;
                    }
                    
                    a {
                        display: flex;
                        align-items: center;
                        color: inherit;
                        transition: color 0.3s linear;

                        &:hover {
                            color: #4b9da5;
                        }
                    }
                }
            }
        }
        
    }
</style>