import { get, writable } from 'svelte/store'

const galleryInterface = {
	images: []
}

export const galleryStore = writable(galleryInterface)
