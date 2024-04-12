<script lang="ts">
	import { askRemoveTag, openImage } from '$lib/actions'
	import { galleryStore } from '$lib/store'
	import { LocalStorageDB } from '$lib/utils/localstorage'
	import type { ImageType } from '$lib/utils/types'
	import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import Fa from 'svelte-fa'

	export let image: ImageType

	let hasHover = false
	let typingTmr: number | undefined = undefined

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
</script>

<div
	role="img"
	on:focus
	on:mouseover={() => (hasHover = true)}
	on:mouseleave={() => (hasHover = false)}
	class="relative flex flex-col rounded-md bg-gray-100"
>
	<button
		on:dblclick={() => openImage()}
		on:click={() => ($galleryStore.selectedImage = image)}
		class:outline={$galleryStore.selectedImage == image}
		class="h-full w-full rounded-md outline-blue-200 hover:outline"
	>
		<img
			class="h-full w-full cursor-pointer rounded-md object-cover duration-150"
			src={image.src?.toString()}
			alt="image {image.name}"
		/>
		<div
			class:hidden={!hasHover && !image.tag}
			class="absolute bottom-0 flex w-full items-center rounded-bl-md rounded-br-lg bg-black bg-opacity-40 text-white"
		>
			<span class="absolute left-1 text-lg">#</span>
			<input
				bind:value={image.tag}
				on:keyup={() => handleKeyUp()}
				on:keydown={() => clearTimeout(typingTmr)}
				type="text"
				class="bottom-0 w-full bg-transparent py-1 pl-4 focus:outline-none"
			/>
			<button
				on:click={() => askRemoveTag(image)}
				class:hidden={!image.tag}
				class="absolute right-1 text-white"
			>
				<Fa icon={faTrashAlt} size=".8x" />
			</button>
		</div>
	</button>
</div>
