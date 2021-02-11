<template>
    <section class="section-banner-game">
        <div class="container">
            <div class="game-categoies">
                <div class="game-categoies__row">
                    <div class="game-categoies__col" v-for="game in games" :key="game.key">
                        <div class="game-categoies__item">
                            <router-link tag="a" :to="{ name: 'Game', query: { category: getConverUrl(game.name) }}" @click="saveKeyGameToLocalStorage(game.key)">{{game.name}}</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>

import firebase from '@/firebase';
import { getFormatUrl } from '@/helpers';

export default {
    name: 'Home',

    data() {
        return {
            games: []
        }
    },

    async mounted() {
        this.games = await firebase.loadPosts('games');
    },

    methods: {
        getConverUrl(url) {
            return getFormatUrl(url);
        },

        saveKeyGameToLocalStorage(key) {
            localStorage.setItem('game-category', key);
        }
    }
}
</script>