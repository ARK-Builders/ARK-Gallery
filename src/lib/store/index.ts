import { get, writable } from 'svelte/store'

const galleryInterface = {
	images: [] as any,
	fileInfos: [] as File[]
}

export const galleryStore = writable(galleryInterface)
