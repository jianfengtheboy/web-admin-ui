<script lang="ts" setup>
import SideBar from './components/SideBar/index.vue'
import HeaderBar from './components/HeaderBar/index.vue'
import TabBar from './components/TabBar/index.vue'
import Main from './components/Main/index.vue'
</script>

<template>
	<a-layout class="layout-container h-full overflow-hidden">
		<SideBar />
		<a-layout class="layout-right overflow-hidden">
			<HeaderBar />
			<TabBar />
			<Main />
		</a-layout>
	</a-layout>
</template>
