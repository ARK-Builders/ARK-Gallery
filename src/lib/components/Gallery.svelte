<script lang="ts">
	import { galleryStore } from '$lib/store'
	import Image from '$lib/components/Image.svelte'
	import Fa from 'svelte-fa'
	import { faBan } from '@fortawesome/free-solid-svg-icons'

	$: noImage = $galleryStore.selectedTag && !$galleryStore.selectedFilteredImages.length

	$: imageHeight = $galleryStore.zoomLevel + 80
</script>

<div
	class="w-full gap-3
		{noImage ? 'flex flex-col items-center justify-center gap-5' : 'grid grid-flow-row justify-center'}"
	style="grid-template-columns: repeat(auto-fill, {imageHeight}px);"
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
