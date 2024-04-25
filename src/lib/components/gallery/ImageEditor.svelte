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
	import type { ImageType } from '$lib/utils/types'
	import { createEventDispatcher } from 'svelte'

	export let showInfo = false

	export let image: ImageType;

	const dispatch = createEventDispatcher()
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
			on:click={() => {
				dispatch("previous")
			}}
			class="absolute left-5 top-[50%] flex h-10 w-10 items-center rounded-full p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
		>
			<Fa icon={faChevronLeft} size="1.6x" />
		</button>
		{#if image}
			<img
				class="h-full w-full rounded-xl object-contain"
				src={image.src?.toString()}
				alt={image.name}
			/>
		{/if}

		<button
			on:click={() => {
				dispatch("next")
			}}
			class="absolute right-5 top-[50%] flex h-10 w-10 items-center rounded-full p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
		>
			<Fa icon={faChevronRight} size="1.6x" />
		</button>
	</div>

	{#if showInfo}
		<ImageDetails image={image} />
	{/if}
</div>
