<script lang="ts">
	import Image from '$lib/components/Image.svelte'
	import Fa from 'svelte-fa'
	import { faBan } from '@fortawesome/free-solid-svg-icons'
	import type { ImageType } from '$lib/utils/types'
	import { createEventDispatcher } from 'svelte'

	export let zoomLevel: number[]

	export let selectedImage: ImageType | null

	export let images: ImageType[] = []

	const dispatch = createEventDispatcher()
</script>

<div
	class="w-full gap-3
		{images.length == 0
		? 'flex flex-col items-center justify-center gap-5'
		: 'grid grid-flow-row justify-center'}"
	style="grid-template-columns: repeat(auto-fill, {zoomLevel[0] + 80}px);"
>
	{#if images.length == 0}
		<Fa icon={faBan} size="5x" class="text-gray-400" />
		<p class="text-gray-600">No Image Found</p>
	{:else}
		{#each images as image}
			<Image
				on:newTag={(e) => {
					dispatch('newTag', { id: image.id, tag: e.detail })
				}}
				on:deleteTag={(e) => {
					dispatch('deleteTag', { id: image.id, tag: e.detail })
				}}
				on:click={() => (selectedImage = image)}
				{image}
				isSelected={selectedImage?.id == image.id}
			/>
		{/each}
	{/if}
</div>
