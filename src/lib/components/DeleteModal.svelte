<script>
	import { faMultiply } from '@fortawesome/free-solid-svg-icons'
	import { createEventDispatcher } from 'svelte'
	import Fa from 'svelte-fa'

	export let show = false

	let hasConfirmed = false

	const dispatch = createEventDispatcher()

	function handleAbort() {
		dispatch('abort')
	}

	function handleSoftDelete() {
		dispatch('softDelete')
	}

	function handleHardDelete() {
		if (!hasConfirmed) {
			hasConfirmed = true
		} else {
			dispatch('hardDelete')
		}
	}
</script>

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div
			class="relative flex w-1/3 flex-col items-center gap-4 overflow-hidden rounded-lg bg-white shadow-xl"
		>
			<header class="flex w-full justify-between bg-red-500 px-6 py-4">
				<h2 class="text-xl font-semibold text-white">Confirm Deletion</h2>
				<button on:click={() => handleAbort()}>
					<Fa class="text-white" icon={faMultiply} />
				</button>
			</header>
			<div class="flex flex-col items-center p-4">
				<img class="w-1/6" src="./trash.png" alt="" />
				<p class="p-4 text-center">
					Are you sure you want to delete this item? This action cannot be undone.
				</p>
				<div class="flex w-full gap-2">
					<button
						class="flex-1 rounded-xl border-2 bg-zinc-800 px-4 py-2 font-semibold text-white"
						on:click={handleSoftDelete}>Move to Recycle Bin</button
					>
					<button
						class="flex-1 rounded-xl bg-red-500 px-4 py-2 text-white"
						on:click={handleHardDelete}
						>{hasConfirmed ? 'Yes I am Sure' : 'Delete Permanently'}</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
