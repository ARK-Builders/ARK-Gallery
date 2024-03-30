import type { ImageType } from '$lib/utils/types'
import { get } from 'svelte/store'
import { galleryStore } from '$lib/store'

export const askDeleteImage = () => {
	const _galleryStore = get(galleryStore)

	if (_galleryStore.selectedImage) {
		_galleryStore.questionModalProp = 'deleteImage'
		_galleryStore.modalQuestion = 'Are you sure want to delete that image?'
		_galleryStore.modal = true
	}

	galleryStore.set(_galleryStore)
}

export const askDeleteTag = () => {
	const _galleryStore = get(galleryStore)
	if (_galleryStore.selectedTag) {
		_galleryStore.questionModalProp = 'deleteTag'
		_galleryStore.modalQuestion = 'Are you sure want to delete that tag?'
		_galleryStore.modal = true
	}

	galleryStore.set(_galleryStore)
}

export const removeImageFromTab = (image: ImageType) => {
	const _galleryStore = get(galleryStore)
	const imageIdx = _galleryStore.viewedImages.indexOf(image)
	if (imageIdx != -1) {
		_galleryStore.viewedImages.splice(imageIdx, 1)
		if (_galleryStore.viewedImages.length) {
			_galleryStore.selectedImage = _galleryStore.viewedImages[0]
		} else {
			_galleryStore.selectedImage = null
			_galleryStore.galleryView = false
		}
	}
	galleryStore.set(_galleryStore)
}

export const filterImageWithTag = () => {
	const _galleryStore = get(galleryStore)

	if (_galleryStore.selectedTag) {
		if (_galleryStore.images.length) {
			let filtered = _galleryStore.images.filter((image) => image.tag == _galleryStore.selectedTag)
			_galleryStore.selectedFilteredImages = filtered
		}
	} else {
		_galleryStore.selectedFilteredImages = []
	}
	galleryStore.set(_galleryStore)
}
