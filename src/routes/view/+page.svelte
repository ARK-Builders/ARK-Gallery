<script lang="ts">
	import Header from '$lib/components/gallery/Header.svelte'
	import ImageEditor from '$lib/components/gallery/ImageEditor.svelte'
	import { galleryStore } from '$lib/store'
	import { onMount } from 'svelte'
	import type { ImageType } from '$lib/utils/types'
	import DeleteModal from '$lib/components/DeleteModal.svelte'
	import { invoke } from '@tauri-apps/api/tauri'
	import { page } from '$app/stores'
	import { goto } from '$app/navigation'

	let showInfo = false
	let tabs: ImageType[] = []
	let activeTab = 0
	let deleteModal = false

	onMount(() => {
		const imageId = $page.url.searchParams.get('image')
		const image = $galleryStore.images.find((img) => img.id === imageId)
		if (!image) {
			return
		}
		tabs.push(image)
	})

	const next = () => {
		tabs[activeTab] =
			$galleryStore.images[
				($galleryStore.images.indexOf(tabs[activeTab]) + 1) % $galleryStore.images.length
			]
	}

	const previous = () => {
		tabs[activeTab] =
			$galleryStore.images[
				($galleryStore.images.indexOf(tabs[activeTab]) - 1 + $galleryStore.images.length) %
					$galleryStore.images.length
			]
	}
</script>

<DeleteModal
	show={deleteModal}
	on:abort={() => {
		deleteModal = false
	}}
	on:softDelete={async () => {
		if (tabs[activeTab]?.path) {
			await invoke('move_file_to_trash', { filePath: tabs[activeTab].path })
			$galleryStore.images = $galleryStore.images.filter(
				(img) => tabs[activeTab] && img.path !== tabs[activeTab].path
			)
			deleteModal = false
			if ($galleryStore.images.length) next()
			else goto('/')
		}
	}}
/>

<div class="flex h-screen w-full flex-col justify-start">
	<Header
		on:delete={() => {
			deleteModal = true
		}}
		bind:tabs
		bind:activeTab
		bind:showInfo
	/>
	<ImageEditor on:next={next} on:previous={previous} image={tabs[activeTab]} bind:showInfo />
</div>
