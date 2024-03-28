<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faImage, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import { faTag, faTrash } from '@fortawesome/free-solid-svg-icons'
	import { Button } from '$lib/components/ui/button'
	import Tooltip from '$lib/components/elements/Tooltip.svelte'
	import { createEventDispatcher } from 'svelte'
	import Fa from 'svelte-fa'

	const dispatch = createEventDispatcher()
	$: hasImages = $galleryStore.images?.length
</script>

<div class="flex flex-row gap-3 justify-end mt-10">
	<Button
		class="flex flex-row items-center text-white gap-2 rounded-xl bg-blue-400 hover:bg-blue-600 px-4 py-2 {!hasImages
			? 'hidden'
			: ''}"
	>
		<Fa icon={faTag} />
		<span>Add tag to image</span>
	</Button>
	<Tooltip>
		<Button
			slot="tip-trigger"
			on:click={() => dispatch('upload')}
			class="flex flex-row items-center text-white gap-2 rounded-xl bg-blue-400 hover:bg-blue-600 px-4 py-2"
		>
			<Fa icon={faImage} />
			<span>Select images</span>
		</Button>
		<p slot="tip-text">Select images folder</p>
	</Tooltip>

	<Tooltip hidden={!$galleryStore.selectedTag}>
		<Button
			slot="tip-trigger"
			variant={'outline'}
			on:click={() => dispatch('deleteTag')}
			class="px-3 bg-gray-200 rounded-lg"
		>
			<Fa icon={faTrashAlt} />
		</Button>
		<p slot="tip-text">Delete tag</p>
	</Tooltip>

	<Tooltip>
		<Button
			slot="tip-trigger"
			variant={'outline'}
			disabled={!$galleryStore.selectedImage}
			on:click={() => dispatch('deleteImage')}
			class="px-3 bg-gray-200 rounded-lg {!hasImages ? 'hidden' : ''}"
		>
			<Fa icon={faTrash} />
		</Button>
		<p slot="tip-text">Delete image</p>
	</Tooltip>
</div>
