<script lang="ts">
	import { faMultiply } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { onMount } from 'svelte'
	import { galleryStore } from '$lib/store'
	import Button from './ui/button/button.svelte'


	let data: any
	let disabled: boolean = false

	const handleYes = () => {
		$galleryStore.isDeleteImage = true
		$galleryStore.modal = false
	}

</script>

<div
	id="modal"
	tabindex="-1"
	class="flex overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed bg-black bg-opacity-40 z-50 justify-center items-center w-screen h-screen"
>
	<div class="flex flex-col min-w-96 rounded-xl border shadow-sm pb-5 px-5 bg-white">
		<div class="flex flex-row mt-2 justify-end">
			<button on:click={() => ($galleryStore.modal = false)}>
				<Fa icon={faMultiply} />
			</button>
		</div>
		<div class="p-2">
			<p class="text text-center py-4">{$galleryStore.modalQuestion}</p>
		</div>
		<!-- <hr class="py-1" /> -->
		<!-- <div>Body</div> -->
		<div class="flex flex-row gap-5 justify-center py-2">
			<Button on:click={() => ($galleryStore.modal = false)} variant={'outline'} class="w-32">
				No
			</Button>
			<Button class="w-32" on:click={() => handleYes()}>Yes</Button>
		</div>
	</div>
</div>
