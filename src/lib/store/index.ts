import { get, writable } from 'svelte/store'

const galleryInterface = {
	images: [] as any,
	fileInfos: [] as File[],
	selectedImage: null,
	isDeleteImage: false,
	modal: false,
	modalQuestion: ''
}

export const galleryStore = writable(galleryInterface)
