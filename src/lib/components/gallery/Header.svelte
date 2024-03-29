<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import {
		faHomeAlt,
		faInfoCircle,
		faMultiply,
		faRedo,
		faUndo
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
</script>

<div class="flex flex-col">
	<div class="mx-auto flex h-16 w-full gap-5 max-w-7xl flex-row items-center">
		<button class="" on:click={() => ($galleryStore.galleryView = false)}>
			<Fa icon={faHomeAlt} class="hover:text-gray-500" />
		</button>

		<div class="flex flex-row h-full gap-1">
			{#if $galleryStore.viewedImages?.length}
				{#each $galleryStore.viewedImages as viewedImage}
					<button
						on:click={() => ($galleryStore.selectedImage = viewedImage)}
						class="relative rounded-lg h-full w-44 px-3 flex items-center
						{viewedImage != $galleryStore.selectedImage ? 'bg-gray-50' : 'bg-white'}"
					>
						<span class="truncate w-full">
							{viewedImage.name}
						</span>
						<button
							on:click|stopPropagation={() => console.log('close')}
							class="absolute top-1 right-1"
						>
							<Fa icon={faMultiply} size=".8x" />
						</button>
					</button>
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex h-16 bg-blue-400 text-white">
		<div class="mx-auto flex w-full max-w-7xl flex-row items-center justify-end gap-2">
			<Fa icon={faUndo} />
			<Fa icon={faRedo} />
			<Fa icon={faInfoCircle} />
			<Fa icon={faTrashAlt} />
		</div>
	</div>
</div>
