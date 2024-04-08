<script lang="ts">
	import { galleryStore } from '$lib/store'
	import {
		faChevronLeft,
		faChevronRight,
		faCropSimple,
		faDroplet,
		faPaintBrush,
		faRotateLeft,
		faRotateRight,
		faT
	} from '@fortawesome/free-solid-svg-icons'

	import ImageDetails from '$lib/components/gallery/ImageDetails.svelte'
	import ActionButton from '$lib/components/gallery/ActionButton.svelte'
	import Fa from 'svelte-fa'
	import { replaceImageInTab } from '$lib/actions'

	export let showInfo = false

	$: idx = $galleryStore.images.map((item: any) => item.id).indexOf($galleryStore.selectedImage?.id)

	const prevImage = () => {
		if (idx && $galleryStore.images.length > 0) {
			idx--
			$galleryStore.selectedImage = $galleryStore.images[idx]
			replaceImageInTab($galleryStore.activeTabIndex)
		}
	}

	const nextImage = () => {
		if (idx > -1 && idx < $galleryStore.images.length - 1) {
			idx++
			$galleryStore.selectedImage = $galleryStore.images[idx]
			replaceImageInTab($galleryStore.activeTabIndex)
		}
	}
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

	<div class="relative h-full max-h-[80vh] w-full">
		<button
			on:click={() => prevImage()}
			class="absolute left-5 top-[50%] flex h-10 w-10 items-center rounded-full p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
		>
			<Fa icon={faChevronLeft} size="1.6x" />
		</button>
		{#if $galleryStore.selectedImage}
			<img
				class="h-full w-full rounded-xl object-contain"
				src={$galleryStore.selectedImage.src?.toString()}
				alt={$galleryStore.selectedImage.name}
			/>
		{/if}

		<button
			on:click={() => nextImage()}
			class="absolute right-5 top-[50%] flex h-10 w-10 items-center rounded-full p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
		>
			<Fa icon={faChevronRight} size="1.6x" />
		</button>
	</div>

	{#if showInfo}
		<ImageDetails />
	{/if}
</div>
