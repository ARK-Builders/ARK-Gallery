<script lang="ts">
	import { faMultiply } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { galleryStore } from '$lib/store'
	import Button from '$lib/components/ui/button/button.svelte'
	import { toast } from 'svelte-sonner'
	import { LocalStorageDB } from '$lib/utils/localstorage'
	import { removeImageFromTab } from '$lib/actions'
	import type { ImageType } from '$lib/utils/types'

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
		if (!$galleryStore.galleryView) {
			$galleryStore.selectedImage = null
		}
	}

	const deleteImage = () => {
		const idx = $galleryStore.images
			.map((item: any) => item.id)
			.indexOf($galleryStore.selectedImage?.id)
		$galleryStore.images.splice(idx, 1)
		$galleryStore.images = $galleryStore.images
		$galleryStore.questionModalProp = ''

		if ($galleryStore.galleryView) {
			if ($galleryStore.viewedImages.length) {
				removeImageFromTab($galleryStore.selectedImage as ImageType)
				$galleryStore.selectedImage = $galleryStore.viewedImages[0]
			} else {
				$galleryStore.galleryView = false
			}
		} else {
			$galleryStore.selectedImage = null
		}
		toast.success('Deleted Image Successfully')
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
			toast.success('Deleted Tag Successfully')
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
