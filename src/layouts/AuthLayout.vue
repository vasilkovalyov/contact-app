<template>
	<section class="section-auth">
		<div class="section-auth__inner">
			<div class="container">
				<div class="section-auth__body">
					<div class="section-auth__header">
						<a href="#" class="logo">
							<img src="images/users.jpg" alt="mycontribution">
							<span class="logo__text">Users App</span>
						</a>
					</div>
					<div class="section-auth__main">
						<router-view  />
					</div>
				</div>
				<div class="section-auth__image" style="background-image: url(./images/auth-image.jpg)"></div>
			</div>
		</div>
	</section>
</template>


<script>
	export default {
		data() {
			return {

			}
		},
	}
</script>

<style lang="scss" deep>
	@import '../scss/base/variables.scss';

	.section-auth {
		position: relative;
		display: flex;
		flex-direction: column;

		&__inner {
		    display: flex;
    		min-height: 100vh;
		}

		&__header {
			margin-bottom: 40px;
		}

		&__image {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 50%;
			background-size: cover;
			background-position: bottom left;
		}

		&__body {
			display: flex;
			flex-direction: column;
			max-width: 480px;
			width: 100%;
			padding: 64px 0;
		}
	}

	.logo {
		color: $secondary-color;

		font-weight: 500;
		font-size: 24px;
		text-align: center;
		

		img {
			display: block;
			width: 100px;
			margin: 0 auto;
		}

		&__text {
			display: block;
		}
	}

	.auth-form-wrapper {
		background-color: $white;

		max-width: 476px;
		width: 100%;
		border-radius: 5px;
		box-shadow: 0px 0px 5px 0px rgba(233,236,239,0.75);
		padding: 22px 30px 8px;

		.auth-form__header {
			color: $secondary-color;

			h2 {
				font-size: 24px;
				margin-bottom: 6px;
				font-weight: 400;
			}
		}
	}

	.auth-form {
		&__btn-wrap {
			text-align: center;
			margin-bottom: 20px;

			p {
				color: $blue-light-1;
				font-size: 14px;
				margin: 15px 0 0;

				> a {
					display: inline-block;
					color: $primary-color;
					transition: color 0.3s linear;

					&:hover {
						color: darken($primary-color, 20%);
					}
				}
			}
		}
	}
</style>