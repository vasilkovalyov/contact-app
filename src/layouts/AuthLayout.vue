<template>
	<section class="section-auth">
		<div class="section-auth__inner">
			<div class="container">
				<div class="section-auth__body">
					<div class="section-auth__header">
						<a href="#" class="logo">
							<img src="images/quiz-1.png" alt="quiz-logo">
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