import { get, writable } from 'svelte/store'
import type { ImageType } from '$lib/utils/types'

const galleryInterface = {
	images: [] as any,
	fileInfos: [] as File[],
	selectedImage: null as unknown as ImageType | null,
	isDeleteImage: false,
	modal: false,
	modalQuestion: '',
	zoomLevel: 100
}

export const galleryStore = writable(galleryInterface)
