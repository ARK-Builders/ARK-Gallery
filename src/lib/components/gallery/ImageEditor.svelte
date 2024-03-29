<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import ImageDetails from '$lib/components/gallery/ImageDetails.svelte'

	export let showInfo = false
</script>

<div class="flex flex-row gap-6 mx-auto w-full max-w-7xl py-12 h-[75vh]">
	<div class="flex flex-col w-36 py-5 gap-3 bg-white rounded-xl shadow-lg">
		<button class="flex flex-col gap-1 items-center">
			<Fa icon={faRotateLeft} />
			<span class="text-sm">Rotate Left</span>
		</button>
		<button class="flex flex-col gap-1 items-center">
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
