<template>
	<div class="wrapper-auth">
		<div class="auth-panel">
			<div class="auth-panel__image">
				<img src="https://static6.depositphotos.com/1003229/609/v/450/depositphotos_6096843-Circuit-board-vector-background.jpg" alt="">
			</div>
			<div class="auth-panel__content">
				<router-view  />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
		})
	}
</script>

<style lang="scss">
    .wrapper-auth {
        min-height: 100vh;
        background-color: #b9586b;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .auth-panel {
		background-color: #394b63;
		overflow: hidden;
		border-radius: 20px;
		max-width: 900px;
		width: 100%;
		min-height: 600px;
		display: flex;
		box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.75);

		&__image {
			width: 50%;
			display: flex;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__content {
			width: 50%;
		}
    }
</style>