<script lang="ts">
	import { faMultiply } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { onMount } from 'svelte'
	import { galleryStore } from '$lib/store'

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
			<button
				class="bg-white outline outline-1 outline-gray-400 text-black w-full rounded-lg py-2 disabled:cursor-not-allowed disabled:bg-opacity-60"
			>
				No
			</button>
			<button
				class="bg-black w-full rounded-lg text-white py-2 disabled:cursor-not-allowed disabled:bg-opacity-60"
			>
				Yes
			</button>
		</div>
	</div>
</div>
