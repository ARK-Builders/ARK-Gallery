<script lang="ts">
	import { faImage, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import { Button } from '$lib/components/ui/button'
	import Tooltip from '$lib/components/elements/Tooltip.svelte'
	import { createEventDispatcher } from 'svelte'
	import Fa from 'svelte-fa'

	const dispatch = createEventDispatcher()
	export let hasImages = false
</script>

<!-- // TODO: FIXME -->
<div class="flex flex-row justify-end gap-3">
	<Tooltip>
		<Button
			slot="tip-trigger"
			on:click={() => dispatch('upload')}
			class="flex flex-row items-center gap-2 rounded-xl bg-blue-400 px-4 py-2 text-white hover:bg-blue-600"
		>
			<Fa icon={faImage} />
			<span>Select images</span>
		</Button>
		<p slot="tip-text">Select images folder</p>
	</Tooltip>

	<Tooltip>
		<Button
			slot="tip-trigger"
			variant={'outline'}
			disabled={false} 
			
			on:click={() => dispatch('deleteImage')}
			class="rounded-lg bg-gray-200 px-3 {!hasImages ? 'hidden' : ''}"
		>
			<Fa icon={faTrashAlt} />
		</Button>
		<p slot="tip-text">Delete image</p>
	</Tooltip>
</div>
