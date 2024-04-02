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
	import Tooltip from '$lib/components/elements/Tooltip.svelte'
	import { createEventDispatcher } from 'svelte'
	import { askDeleteImage, removeImageFromTab } from '$lib/actions'

	export let showInfo = false

	const dispatch = createEventDispatcher()
</script>

<div class="flex flex-col">
	<div class="mx-auto flex h-16 w-full max-w-7xl flex-row items-center gap-5 px-5">
		<button class="" on:click={() => ($galleryStore.galleryView = false)}>
			<Fa icon={faHomeAlt} class="hover:text-gray-500" />
		</button>

		<div class="flex h-full flex-row gap-1">
			{#if $galleryStore.viewedImages?.length}
				{#each $galleryStore.viewedImages as viewedImage}
					<Tooltip>
						<button
							slot="tip-trigger"
							on:click={() => ($galleryStore.selectedImage = viewedImage)}
							class="relative flex h-full w-44 items-center rounded-lg px-3
						{viewedImage != $galleryStore.selectedImage ? 'bg-gray-50' : 'bg-white'}"
						>
							<span class="w-full truncate">
								{viewedImage.name}
							</span>
							<button
								on:click|stopPropagation={() => removeImageFromTab(viewedImage)}
								class="absolute right-1 top-1"
							>
								<Fa icon={faMultiply} size=".8x" />
							</button>
						</button>
						<span slot="tip-text">{viewedImage.name}</span>
					</Tooltip>
				{/each}
			{/if}
		</div>
	</div>
	<div class="flex h-16 bg-blue-400 px-5 text-white">
		<div class="mx-auto flex w-full max-w-7xl flex-row items-center justify-end gap-4">
			<button class="h-8">
				<Fa icon={faUndo} />
			</button>
			<button class="h-8">
				<Fa icon={faRedo} />
			</button>
			<button
				class="h-8 {showInfo && 'border-b border-white'}"
				on:click={() => (showInfo = !showInfo)}
			>
				<Fa icon={faInfoCircle} />
			</button>
			<button class="h-8" on:click={() => askDeleteImage()}>
				<Fa icon={faTrashAlt} />
			</button>
		</div>
	</div>
</div>
