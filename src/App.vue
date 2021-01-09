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
import AdminLayout from '@/layouts/AdminLayout';
import PublicLayout from '@/layouts/PublicLayout';


export default {
	data: () => ({

	}),

	async mounted() {
		await this.$store.dispatch('onAuthUser');
	},

	components: {
		AuthLayout,
		AdminLayout,
		PublicLayout
	},

	computed: {
		layout() {
			return this.$route.meta.layout;
		}
	}
}
</script>

<style lang="scss">
	#app {
		overflow: hidden;
	}
</style>
