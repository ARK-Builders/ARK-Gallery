import { writable } from 'svelte/store'
import type { ImageType } from '$lib/utils/types'

const galleryInterface = {
	images: [] as ImageType[],
	questionModalProp: '' as string,
	modal: false as boolean,
	modalQuestion: '' as string
}

export const galleryStore = writable(galleryInterface)
