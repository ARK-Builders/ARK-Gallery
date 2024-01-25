<script lang="ts">
	import { galleryStore } from "$lib/store"
	import { faImage } from "@fortawesome/free-regular-svg-icons"
	import { faTag, faTrash } from "@fortawesome/free-solid-svg-icons"
	import { createEventDispatcher } from "svelte"
	import Fa from "svelte-fa"
	
	const dispatch = createEventDispatcher();

</script>
<div class="flex flex-row gap-3 justify-end mt-10">
	<button
	class:hidden={!$galleryStore.images?.length}
		class="flex flex-row items-center text-white gap-2 rounded-xl bg-blue-400 hover:bg-blue-600 px-4 py-2"
	>
		<Fa icon={faTag} />
		<span>Add tag to image</span>
	</button>
	<button
		on:click={() => dispatch('upload')}
		class="flex flex-row items-center text-white gap-2 rounded-xl bg-blue-400 hover:bg-blue-600 px-4 py-2"
	>
		<Fa icon={faImage} />
		<span>Select images</span>
	</button>

	<button class:hidden={!$galleryStore.images?.length} class="px-3 bg-slate-200 rounded-lg">
		<Fa icon={faTrash} />
	</button>
</div>