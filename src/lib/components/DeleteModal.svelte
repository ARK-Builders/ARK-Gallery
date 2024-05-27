<script lang="ts">
	import { faMultiply } from '@fortawesome/free-solid-svg-icons'
	import { createEventDispatcher } from 'svelte'
	import Fa from 'svelte-fa'
	import Button from './ui/button/button.svelte'

	export let show = false

	const dispatch = createEventDispatcher()

	function handleAbort() {
		dispatch('abort')
	}

	function handleSoftDelete() {
		dispatch('softDelete')
	}
</script>

{#if show}
	<div
		id="modal"
		tabindex="-1"
		class="fixed z-50 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 backdrop-blur-sm"
	>
		<div class="flex min-w-96 flex-col rounded-xl border bg-white px-5 pb-5 shadow-sm">
			<div class="mt-2 flex flex-row justify-end">
				<button on:click={() => handleAbort()}>
					<Fa icon={faMultiply} />
				</button>
			</div>
			<div class="p-2">
				<p class="text py-4 text-center">Are you sure you want to delete this image</p>
			</div>
			<div class="flex flex-row justify-center gap-5 py-2">
				<Button on:click={() => handleAbort()} variant={'outline'} class="w-32">No</Button>
				<Button class="w-32" on:click={() => handleSoftDelete()}>Yes</Button>
			</div>
		</div>
	</div>
{/if}
