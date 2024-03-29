<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { LocalStorageDB } from '$lib/utils/localstorage'
	import type { ImageType } from '$lib/utils/types'
	import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import Fa from 'svelte-fa'

	export let image: ImageType

	let hasHover = false
	let typingTmr: number | undefined = undefined

	$: imageHeight = $galleryStore.zoomLevel + 80

	const removeTag = (image: ImageType) => {
		if (image.tag) {
			$galleryStore.modalQuestion = 'Are you sure want to remove this tag?'
			$galleryStore.selectedImage = image
			$galleryStore.questionModalProp = 'removeTag'
			$galleryStore.modal = true
			return
		}
	}

	const handleKeyUp = () => {
		clearTimeout(typingTmr)
		typingTmr = setTimeout(() => {
			const tags = new LocalStorageDB('tags')

			if (tags.getAll() && tags.getAll().length) {
				let allTags = new Set(tags.getAll())
				allTags.add(image.tag)
				let tagsArray = Array.from(allTags)

				tags.update(tagsArray)
				$galleryStore.tags = tagsArray
			} else {
				tags.create([image.tag])
			}
		}, 1500)
	}

	const openImage = () => {
		$galleryStore.galleryView = true
		console.log($galleryStore.selectedImage)
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
		on:dblclick={() => openImage()}
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
				on:keyup={() => handleKeyUp()}
				on:keydown={() => clearTimeout(typingTmr)}
				type="text"
				class="w-full py-1 pl-4 bg-transparent bottom-0 focus:outline-none"
			/>
			<button
				on:click={() => removeTag(image)}
				class:hidden={!image.tag}
				class="absolute right-1 text-white"
			>
				<Fa icon={faTrashAlt} size=".8x" />
			</button>
		</div>
	</button>
</div>
