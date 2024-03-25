<script lang="ts">
	import { faMultiply } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { galleryStore } from '$lib/store'
	import Button from '$lib/components/ui/button/button.svelte'
	import { toast } from 'svelte-sonner'
	import { LocalStorageDB } from '$lib/utils/localstorage'

	const handleYes = () => {
		if ($galleryStore.questionModalProp == 'deleteImage') {
			deleteImage()
		} else if ($galleryStore.questionModalProp == 'deleteTag') {
			deleteTag()
		} else if ($galleryStore.questionModalProp == 'removeTag') {
			removeTag()
		}
		$galleryStore.modal = false
	}

	const handleNo = () => {
		$galleryStore.modal = false
		$galleryStore.selectedImage = null
	}

	const deleteImage = () => {
		const idx = $galleryStore.images
			.map((item: any) => item.id)
			.indexOf($galleryStore.selectedImage?.id)
		$galleryStore.images.splice(idx, 1)
		$galleryStore.images = $galleryStore.images
		$galleryStore.questionModalProp = ''
		$galleryStore.selectedImage = null
		toast.info('Deleted Image Successfully')
	}

	const deleteTag = () => {
		const inUse = $galleryStore.images.find((image) => image.tag == $galleryStore.selectedTag)
		if (!inUse) {
			const tags = new LocalStorageDB('tags')
			tags.delete($galleryStore.selectedTag)
			$galleryStore.tags = tags.getAll()
			// resetting filtered images store
			$galleryStore.selectedTag = ''
			$galleryStore.selectedFilteredImages = []
			toast.warning('Deleted Tag Successfully')
		} else {
			toast.warning("Can't delete! Tag is in use")
		}
	}

	const removeTag = () => {
		if ($galleryStore.selectedImage) {
			$galleryStore.selectedImage.tag = ''
			toast.info('Tag remvoed from Image')
		}
	}
</script>

<div
	id="modal"
	tabindex="-1"
	class="flex overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed bg-black bg-opacity-40 z-50 justify-center items-center w-screen h-screen"
>
	<div class="flex flex-col min-w-96 rounded-xl border shadow-sm pb-5 px-5 bg-white">
		<div class="flex flex-row mt-2 justify-end">
			<button on:click={() => handleNo()}>
				<Fa icon={faMultiply} />
			</button>
		</div>
		<div class="p-2">
			<p class="text text-center py-4">{$galleryStore.modalQuestion}</p>
		</div>
		<div class="flex flex-row gap-5 justify-center py-2">
			<Button on:click={() => handleNo()} variant={'outline'} class="w-32">No</Button>
			<Button class="w-32" on:click={() => handleYes()}>Yes</Button>
		</div>
	</div>
</div>
