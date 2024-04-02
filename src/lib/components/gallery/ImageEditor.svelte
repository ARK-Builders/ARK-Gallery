<script lang="ts">
	import { galleryStore } from '$lib/store'
	import {
		faCropSimple,
		faDroplet,
		faPaintBrush,
		faRotateLeft,
		faRotateRight,
		faT
	} from '@fortawesome/free-solid-svg-icons'

	import ImageDetails from '$lib/components/gallery/ImageDetails.svelte'
	import ActionButton from '$lib/components/gallery/ActionButton.svelte'

	export let showInfo = false
</script>

<div class="mx-auto flex h-[75vh] w-full max-w-7xl flex-row gap-6 px-5 py-12">
	<div class="flex w-36 flex-col gap-6 rounded-xl bg-white py-5 shadow-lg">
		<ActionButton text="Rotate Left" icon={faRotateLeft} />
		<ActionButton text="Rotate Right" icon={faRotateRight} />
		<ActionButton text="Brush" icon={faPaintBrush} />
		<ActionButton text="Blur" icon={faDroplet} />
		<ActionButton text="Crop" icon={faCropSimple} />
		<ActionButton text="Text" icon={faT} />
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
