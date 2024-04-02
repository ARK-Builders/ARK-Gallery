import type { ImageType } from '$lib/utils/types'
import { get } from 'svelte/store'
import { galleryStore } from '$lib/store'
import { toast } from 'svelte-sonner'
import { LocalStorageDB } from '$lib/utils/localstorage'

export const openImage = () => {
	const _galleryStore = get(galleryStore)

	if (_galleryStore.selectedImage) {
		if (_galleryStore.viewedImages.length) {
			const alreadyViewed = _galleryStore.viewedImages.find(
				(image) => image.id == _galleryStore.selectedImage?.id
			)
			if (!alreadyViewed) {
				_galleryStore.viewedImages.push(_galleryStore.selectedImage)
			}
		}
		_galleryStore.galleryView = true
	}
	galleryStore.set(_galleryStore)
}

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

export const askRemoveTag = (image: ImageType) => {
	const _galleryStore = get(galleryStore)

	if (image.tag) {
		_galleryStore.modalQuestion = 'Are you sure want to remove this tag?'
		_galleryStore.selectedImage = image
		_galleryStore.questionModalProp = 'removeTag'
		_galleryStore.modal = true
	}

	galleryStore.set(_galleryStore)
}

export const deleteImage = () => {
	const _galleryStore = get(galleryStore)

	const idx = _galleryStore.images
		.map((item: any) => item.id)
		.indexOf(_galleryStore.selectedImage?.id)
	_galleryStore.images.splice(idx, 1)
	_galleryStore.images = _galleryStore.images
	_galleryStore.questionModalProp = ''

	if (_galleryStore.galleryView) {
		if (_galleryStore.viewedImages.length) {
			removeImageFromTab(_galleryStore.selectedImage as ImageType)
			_galleryStore.selectedImage = _galleryStore.viewedImages[0]
		} else {
			_galleryStore.galleryView = false
		}
	} else {
		_galleryStore.selectedImage = null
	}

	galleryStore.set(_galleryStore)
	toast.success('Deleted Image Successfully')
}

export const deleteTag = () => {
	const _galleryStore = get(galleryStore)

	const inUse = _galleryStore.images.find((image) => image.tag == _galleryStore.selectedTag)
	if (!inUse) {
		const tags = new LocalStorageDB('tags')
		tags.delete(_galleryStore.selectedTag)
		_galleryStore.tags = tags.getAll()
		// resetting filtered images store
		_galleryStore.selectedTag = ''
		_galleryStore.selectedFilteredImages = []
		toast.success('Deleted Tag Successfully')
	} else {
		toast.warning("Can't delete! Tag is in use")
	}

	galleryStore.set(_galleryStore)
}

export const removeTag = () => {
	const _galleryStore = get(galleryStore)

	if (_galleryStore.selectedImage) {
		_galleryStore.selectedImage.tag = ''
		toast.info('Tag remvoed from Image')
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
