<script lang="ts">
	import { galleryStore } from '$lib/store'
	import Image from '$lib/components/Image.svelte'
	import Fa from 'svelte-fa'
	import { faBan } from '@fortawesome/free-solid-svg-icons'

	$: noImage = $galleryStore.selectedTag && !$galleryStore.selectedFilteredImages.length
</script>

<div
	class="w-full flex-1 gap-3 overflow-auto p-1
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
