<script lang="ts" setup></script>

<template>
	<span class="controller relative box-border flex items-center justify-center">
		<span class="icon inline-block cursor-pointer">
			<i class="square block relative square-top"></i>
			<i class="square block relative square-bottom"></i>
		</span>
	</span>
</template>

<style lang="less" scoped>
.controller {
	margin-right: 14px;

	.icon {
		color: var(--color-text-2);
		transition: transform 0.3s ease-out;

		.square {
			width: 14px;
			height: 6px;

			&.square-bottom {
				margin-top: 2px;
			}

			&::before {
				content: '';
				width: 6px;
				height: 6px;
				position: absolute;
				left: 0;
				background: var(--color-text-3);
			}

			&::after {
				content: '';
				width: 6px;
				height: 6px;
				position: absolute;
				left: 8px;
				background: var(--color-text-3);
			}
		}
	}
}

.controller:hover .icon .square:first-child::before,
.arco-dropdown-open .icon .square:first-child::before {
	transform: rotate(45deg);
	background: rgb(var(--primary-3));
}

.controller:hover .icon .square:before,
.arco-dropdown-open .icon .square:before {
	background: rgb(var(--primary-6));
}

.controller:hover .icon .square:after,
.arco-dropdown-open .icon .square:after {
	background: rgb(var(--primary-6));
}

.controller:hover .icon,
.arco-dropdown-open .icon {
	transform: rotate(90deg);
}
</style>
