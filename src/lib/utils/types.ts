export type ImageType = {
	id: string
	src: string | ArrayBuffer | null
	tag: string
	name: string
	size: number
	resolution: string
	compression: number | undefined
	lastModified: string | number
	type: string
}
