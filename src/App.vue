<template>
	<div id="app">
		<component :is="layout">
			<router-view :layout.sync="layout" />
		</component>
	</div>
</template>

<script>

//Layouts Components
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';

export default {
	data: () => ({

	}),

	async mounted() {
		await this.$store.dispatch('onAuthUser');
	},

	components: {
		AuthLayout,
		MainLayout
	},

	computed: {
		layout() {
			return this.$route.meta.layout;
		}
	}
}
</script>

<style lang="scss">

</style>
