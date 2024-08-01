<script lang="ts" setup>
import cornerBottom from './cornerBottom.vue'
import cornerTop from './cornerTop.vue'
</script>

<template>
	<div class="fixed w-full h-full overflow-hidden z-10">
		<div class="corder-top-box absolute">
			<cornerTop />
		</div>
		<div class="corner-bottom-box absolute">
			<cornerBottom />
		</div>
		<div class="fly fixed pointer-events-none bg-fly-circle1"></div>
		<div class="fly fixed pointer-events-none bg-fly-circle2"></div>
		<div class="fly fixed pointer-events-none bg-fly-circle3"></div>
		<div class="fly fixed pointer-events-none bg-fly-circle4"></div>
	</div>
</template>

<style lang="less" scoped>
.corder-top-box {
	top: -1000px;
	right: -700px;
}
.corner-bottom-box {
	bottom: -600px;
	left: -300px;
}
.fly {
	z-index: 99;
}
.bg-fly-circle1 {
	left: 40px;
	top: 100px;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background: linear-gradient(to right, rgba(var(--primary-6), 0.07) 0%, rgba(var(--primary-6), 0.04) 100%);
	animation: move 2.5s linear infinite;
}

.bg-fly-circle2 {
	left: 15%;
	bottom: 5%;
	width: 150px;
	height: 150px;
	border-radius: 50%;
	background: linear-gradient(to right, rgba(var(--primary-6), 0.08) 0%, rgba(var(--primary-6), 0.04) 100%);
	animation: move 3s linear infinite;
}

.bg-fly-circle3 {
	right: 20%;
	top: 140px;
	width: 145px;
	height: 145px;
	border-radius: 50%;
	background: linear-gradient(to right, rgba(var(--primary-6), 0.1) 0%, rgba(var(--primary-6), 0.04) 100%);
	animation: move 2.5s linear infinite;
}

.bg-fly-circle4 {
	right: 5%;
	top: 60%;
	width: 160px;
	height: 160px;
	border-radius: 50%;
	background: linear-gradient(to right, rgba(var(--primary-6), 0.02) 0%, rgba(var(--primary-6), 0.04) 100%);
	animation: move 3.5s linear infinite;
}

@keyframes move {
	0% {
		transform: translateY(0px) scale(1);
	}

	50% {
		transform: translateY(25px) scale(1.1);
	}

	100% {
		transform: translateY(0px) scale(1);
	}
}
</style>
