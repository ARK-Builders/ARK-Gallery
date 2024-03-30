<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import ImageDetails from '$lib/components/gallery/ImageDetails.svelte'

	export let showInfo = false
</script>

<div class="mx-auto flex h-[75vh] w-full max-w-7xl flex-row gap-6 py-12">
	<div class="flex w-36 flex-col gap-3 rounded-xl bg-white py-5 shadow-lg">
		<button class="flex flex-col items-center gap-1">
			<Fa icon={faRotateLeft} />
			<span class="text-sm">Rotate Left</span>
		</button>
		<button class="flex flex-col items-center gap-1">
			<Fa icon={faRotateRight} />
			<span class="text-sm">Rotate Right</span>
		</button>
	</div>

	<div class="h-full max-h-[80vh] w-full">
		{#if $galleryStore.selectedImage}
			<img
				class="h-full w-full rounded-xl object-contain"
				src={$galleryStore.selectedImage.src?.toString()}
				alt={$galleryStore.selectedImage.name}
			/>
		{/if}
	</div>

	{#if showInfo}
		<ImageDetails />
	{/if}
</div>
