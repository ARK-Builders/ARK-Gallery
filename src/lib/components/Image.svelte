<script lang="ts">
	import { galleryStore } from '$lib/store'
	import type { ImageType } from '$lib/utils/types'
	import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import Fa from 'svelte-fa'

	export let image: ImageType
	let hasHover = false

	$: imageHeight = $galleryStore.zoomLevel + 80

	const deleteTag = (image: ImageType) => {
		if (image.tag) {
			$galleryStore.modalQuestion = 'Are you sure want to delete this tag?'
			$galleryStore.selectedImage = image
			$galleryStore.questionModalProp = 'deleteTag'
			$galleryStore.modal = true
			return
		}
	}
</script>

<div
	role="img"
	on:focus
	on:mouseover={() => (hasHover = true)}
	on:mouseleave={() => (hasHover = false)}
	class="flex flex-col relative rounded-md bg-gray-100"
	style="height: {imageHeight}px;"
>
	<button
		on:click={() => ($galleryStore.selectedImage = image)}
		class:outline={$galleryStore.selectedImage == image}
		class="w-full h-full rounded-md hover:outline outline-blue-200"
	>
		<img
			class="w-full h-full object-cover rounded-md cursor-pointer duration-150"
			src={image.src?.toString()}
			alt="image {image.name}"
		/>
		<div
			class:hidden={!hasHover && !image.tag}
			class="absolute bottom-0 bg-black text-white bg-opacity-40 flex items-center w-full rounded-bl-md rounded-br-lg"
		>
			<span class="absolute left-1 text-lg">#</span>
			<input
				bind:value={image.tag}
				type="text"
				class="w-full py-1 pl-4 bg-transparent bottom-0 focus:outline-none"
			/>
			<button
				on:click={() => deleteTag(image)}
				class:hidden={!image.tag}
				class="absolute right-1 text-white"
			>
				<Fa icon={faTrashAlt} size=".8x" />
			</button>
		</div>
	</button>
</div>
