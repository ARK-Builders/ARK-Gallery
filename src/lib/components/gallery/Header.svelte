<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import {
		faHomeAlt,
		faInfo,
		faInfoCircle,
		faRedo,
		faUndo
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
</script>

<div class="flex flex-col">
	<div class="mx-auto flex h-16 w-full max-w-7xl flex-row items-center">
		<button class="" on:click={() => ($galleryStore.galleryView = false)}>
			<Fa icon={faHomeAlt} />
		</button>
	</div>
	<div class="flex h-16 bg-blue-400 text-white">
		<div class="mx-auto flex w-full max-w-7xl flex-row items-center justify-end gap-2">
			<Fa icon={faUndo} />
			<Fa icon={faRedo} />
			<Fa icon={faInfoCircle} />
			<Fa icon={faTrashAlt} />
		</div>
	</div>
</div>
