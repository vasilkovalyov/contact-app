<template>
	<div class="wrapper-auth">
		<div class="container">
			<div class="auth-panel">
				<div class="auth-panel__image">
					<img src="https://static6.depositphotos.com/1003229/609/v/450/depositphotos_6096843-Circuit-board-vector-background.jpg" alt="">
				</div>
				<div class="auth-panel__content">
					<ul class="switcher-links">
						<li class="switcher-links__item">
							<router-link to="/login" class="switcher-links__item-link">Sign in</router-link>
						</li>
						<li class="switcher-links__item">
							<router-link to="/register" class="switcher-links__item-link">Sign up</router-link>
						</li>
					</ul>
					<p class="auth-panel__head">
						<router-link to="/login" class="auth-panel__head-link">Sign in</router-link>
						<span>or</span>
						<router-link to="/register" class="auth-panel__head-link">Sign up</router-link>

					</p>
					<router-view  />
				</div>
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
		max-width: 450px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		min-height: 460px;
		box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.75);

		@media (min-width: 1024px) {
			max-width: 900px;
			min-height: 560px;
		}

		&__image {
			width: 50%;
			display: none;

			@media (min-width: 1024px) {
				display: flex
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__content {
			width: 100%;
			color: #ffffff;
			padding: 30px 15px;

			@media (min-width: 1023px) {
				width: 50%;
				padding: 40px 40px 80px;
			}
		}

		&__head {

			@media (max-width: 1023px) {
				text-align: center;
				margin-bottom: 30px;
			}

			@media (min-width: 1024px) {
				text-align: center;
				margin-bottom: 50px;
			}

			&-link {
				position: relative;
				color: #ffffff;
				color: #677987;
				font-size: 20px;

				@media (min-width: 1024px) {
					font-size: 24px;
				}

				&.router-link-active {
					color: #ffffff;

					&:after {
						content: '';
						position: absolute;
						bottom: -3px;
						left: 0;
						right: 0;
						height: 1px;
						background-color: #57c7bb;
					}
				}
			}

			> span {
				display: inline-block;
				margin: 0 10px 0 10px;
			}
		}
	}
	
	.switcher-links {
		list-style-type: none;
		display: flex;
		justify-content: center;
		padding: 0;
		margin: 0 0 30px;
		

		@media (min-width: 1024px) {
			justify-content: flex-end;
			margin: 0 0 50px;
		}

		&__item {
			&:nth-child(1) {
				.switcher-links__item-link {
					border-radius: 10px 0 0 10px;
				}
			}

			&:nth-child(2) {
				.switcher-links__item-link {
					border-radius: 0px 10px 10px 0;
				}
			}

			&-link {
				display: block;
				color: #677987;
				background-color: #46596a;
				font-size: 13px;
				padding: 5px 12px;
				transition: 0.3s color linear, 0.3s background-color linear;

				&.router-link-active {
					color: #ffffff;
					background-color: #57c7bb;
				}
			}
		}
	}
</style>