import { writable } from 'svelte/store'
import type { ImageType } from '$lib/utils/types'

const galleryInterface = {
	images: [] as any[],
	selectedFilteredImages: [] as any[],
	tags: [] as string[],
	selectedTag: '' as string,
	fileInfos: [] as File[],
	selectedImage: null as unknown as ImageType | null,
	questionModalProp: '' as string,
	modal: false as boolean,
	modalQuestion: '' as string,
	zoomLevel: 100 as number,
	activeFilter: '',
	galleryView: false as boolean,
	viewedImages: [] as ImageType[]
}

export const galleryStore = writable(galleryInterface)
