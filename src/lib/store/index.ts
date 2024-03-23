import { writable } from 'svelte/store'
import type { ImageType } from '$lib/utils/types'

const galleryInterface = {
	images: [] as any[],
	fileInfos: [] as File[],
	selectedImage: null as unknown as ImageType | null,
	questionModalProp: '' as string,
	modal: false as boolean,
	modalQuestion: '' as string,
	zoomLevel: 100 as number,
	activeFilter: ''
}

export const galleryStore = writable(galleryInterface)

// export const galleryStore = {
// 	subscribe: store.subscribe,
// 	set: store.set,
// 	update: store.update,
// 	reset: () => {
// 		store.set(JSON.parse(JSON.stringify(galleryInterface)))
// 	}
// }
