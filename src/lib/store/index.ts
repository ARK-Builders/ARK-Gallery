import { get, writable } from 'svelte/store'

const galleryInterface = {
	images: [] as any,
	fileInfos: [] as File[],
	selectedImage: null
}

export const galleryStore = writable(galleryInterface)
