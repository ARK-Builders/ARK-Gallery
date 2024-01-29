<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faImage } from '@fortawesome/free-regular-svg-icons'
	import { faTag, faTrash } from '@fortawesome/free-solid-svg-icons'
	import { createEventDispatcher } from 'svelte'
	import Fa from 'svelte-fa'
	import { Button } from '$lib/components/ui/button'

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
	<Button
		on:click={() => dispatch('upload')}
		class="flex flex-row items-center text-white gap-2 rounded-xl bg-blue-400 hover:bg-blue-600 px-4 py-2"
	>
		<Fa icon={faImage} />
		<span>Select images</span>
	</Button>

	<Button
		variant={'outline'}
		disabled={!$galleryStore.selectedImage}
		on:click={() => dispatch('delete')}
		class="px-3 bg-gray-200 rounded-lg {!hasImages ? 'hidden' : ''} {!hasImages
			? 'cursor-not-allowed'
			: ''}"
	>
		<Fa icon={faTrash} />
	</Button>
</div>
