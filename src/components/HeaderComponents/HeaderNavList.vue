<template>
    <ul class="header-nav-list" :class="isTextVisible ? 'header-nav-list__secondary' : 'header-nav-list__primary'">
        <li class="header-nav-list__item" v-for="(item, key) in getNavListArray" :key="key">
            <router-link :to="item.link"  class="header-nav-list__link">
                <span class="header-nav-list__icon">
                    <i class="fas" :class="item.icon"></i>
                </span>
                <span v-if="isTextVisible" class="header-nav-list__text">{{item.text}}</span>
            </router-link>
        </li>
        <li class="header-nav-list__item">
            <a href="#" @click.prevent="signOut" class="header-nav-list__link">
                <span class="header-nav-list__icon">
                    <i class="fas fa-sign-out-alt"></i>
                </span>
                <span class="header-nav-list__text" v-if="isTextVisible">Sign out</span>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'HeaderNavList',

    props: {
        navListPrimary: {
            type: Array,
            default: [],
            required: true
        },
        navListSecondary: {
            type: Array,
            default: null,
            required: false
        },
        isTextVisible: {
            type: Boolean,
            default: true,
            required: false
        },
        isSecondaryListVisible: {
            type: Boolean,
            default: false,
            required: false
        },
    },

    data() {
        return {

        }
    },

    computed: {
        getNavListArray() {
            if(this.isSecondaryListVisible) {
                return [...this.navListPrimary, ...this.navListSecondary];
            } else {
                return this.navListPrimary;
            }
        }
    },

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