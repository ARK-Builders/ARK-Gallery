<script lang="ts">
	import { faMultiply } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { galleryStore } from '$lib/store'
	import Button from '$lib/components/ui/button/button.svelte'

	const handleYes = () => {
		$galleryStore.modal = false
	}

	const handleNo = () => {
		$galleryStore.modal = false
	}
</script>

<div
	id="modal"
	tabindex="-1"
	class="fixed z-50 flex h-screen w-screen items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-40 backdrop-blur-sm"
>
	<div class="flex min-w-96 flex-col rounded-xl border bg-white px-5 pb-5 shadow-sm">
		<div class="mt-2 flex flex-row justify-end">
			<button on:click={() => handleNo()}>
				<Fa icon={faMultiply} />
			</button>
		</div>
		<div class="p-2">
			<p class="text py-4 text-center">{$galleryStore.modalQuestion}</p>
		</div>
		<div class="flex flex-row justify-center gap-5 py-2">
			<Button on:click={() => handleNo()} variant={'outline'} class="w-32">No</Button>
			<Button class="w-32" on:click={() => handleYes()}>Yes</Button>
		</div>
	</div>
</div>
