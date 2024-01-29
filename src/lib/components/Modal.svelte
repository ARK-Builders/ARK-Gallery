<script lang="ts">
	import { faMultiply } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { onMount } from 'svelte'
	import { galleryStore } from '$lib/store'
	import Button from './ui/button/button.svelte'

	let data: any
	let disabled: boolean = false

</script>

<div
	id="modal"
	tabindex="-1"
	class="flex overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed bg-black bg-opacity-40 z-50 justify-center items-center w-screen h-screen"
>
	<div class="flex flex-col min-w-96 rounded-xl border shadow-sm pb-5 px-5 bg-white">
		<div class="flex flex-row justify-between">
			<p class="capitalize font-semibold text-lg py-4">Questions here</p>
			<button on:click={() => $galleryStore.modal = false}>
				<Fa icon={faMultiply} />
			</button>
		</div>
		<hr class="py-1" />
		<!-- <div>Body</div> -->
		<div class="flex flex-row gap-5 w-full py-2">
			<Button on:click={() => console.log('no')} variant={'outline'} class="w-full">
				No
			</Button>
			<Button class="w-full" on:click={() => console.log("yes")}>
				Yes
			</Button>
		</div>
	</div>
</div>
