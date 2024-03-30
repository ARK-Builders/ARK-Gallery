<script lang="ts">
	import { galleryStore } from '$lib/store'
	import Image from '$lib/components/Image.svelte'
	import Fa from 'svelte-fa'
	import { faBan } from '@fortawesome/free-solid-svg-icons'
	import 'viewerjs/dist/viewer.css'
	import Viewer from 'viewerjs'
	import { onMount } from 'svelte'

	let imgContainerRef: HTMLElement | null = null
	let viewer
	$: noImage = $galleryStore.selectedTag && !$galleryStore.selectedFilteredImages.length

	onMount(() => {
		if (imgContainerRef) {
			viewer = new Viewer(imgContainerRef, {
				inline: false,
				toolbar: {
					zoomIn: 1,
					zoomOut: 1,
					reset: 1,
					prev: 1,
					play: 0,
					next: 1,
					rotateLeft: 1,
					rotateRight: 1,
					flipHorizontal: 1,
					flipVertical: 1
				}
			})
		}
	})
</script>

{#if $galleryStore.images?.length}
	<div
		class="max-h-[60vh] gap-3 overflow-auto
		{noImage
			? 'flex w-full flex-col items-center justify-center gap-5'
			: 'grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6'}"
	>
		{#if noImage}
			<Fa icon={faBan} size="5x" class="text-gray-400" />
			<p class="text-gray-600">No Image Found</p>
		{:else}
			{#each $galleryStore.selectedFilteredImages.length ? $galleryStore.selectedFilteredImages : $galleryStore.images as image, i}
				<Image bind:image />
			{/each}
		{/if}
	</div>
{/if}
