import { get, writable } from 'svelte/store'

const galleryInterface = {
	images: [] as any,
	fileInfos: [] as File[],
	selectedImage: null,
	modal: false
}

export const galleryStore = writable(galleryInterface)
