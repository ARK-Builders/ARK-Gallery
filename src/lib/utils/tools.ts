import { galleryStore } from '$lib/store'
import { get } from 'svelte/store'

export const openDirectory = async (mode = 'read') => {
	// Feature detection. The API needs to be supported
	// and the app not run in an iframe.
	const supportsFileSystemAccess =
		'showDirectoryPicker' in window &&
		(() => {
			try {
				return window.self === window.top
			} catch {
				return false
			}
		})()

	// If the File System Access API is supported…
	if (supportsFileSystemAccess) {
		let directoryStructure = undefined

		const getFiles = async (dirHandle: any, path = dirHandle.name): Promise<File[]> => {
			const dirs = []
			const files = []
			for await (const entry of dirHandle.values()) {
				const nestedPath = `${path}/${entry.name}`
				if (entry.kind === 'file') {
					files.push(
						entry.getFile().then((file: any) => {
							file.directoryHandle = dirHandle
							file.handle = entry
							return Object.defineProperty(file, 'webkitRelativePath', {
								configurable: true,
								enumerable: true,
								get: () => nestedPath
							})
						})
					)
				} else if (entry.kind === 'directory') {
					dirs.push(getFiles(entry, nestedPath))
				}
			}
			return [...(await Promise.all(dirs)).flat(), ...(await Promise.all(files))]
		}

		try {
			const handle = await showDirectoryPicker({
				mode
			})
			directoryStructure = getFiles(handle, undefined)
		} catch (err: any) {
			if (err.name !== 'AbortError') {
				console.error(err.name, err.message)
			}
		}
		return directoryStructure
	}

	// Fallback if the File System Access API is not supported.
	return new Promise((resolve) => {
		const input = document.createElement('input')
		input.type = 'file'
		input.webkitdirectory = true

		input.addEventListener('change', () => {
			let files = Array.from(input.files)
			resolve(files)
		})
		if ('showPicker' in HTMLInputElement.prototype) {
			input.showPicker()
		} else {
			input.click()
		}
	})
}

export function makeid(length: number) {
	let str = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	let counter = 0
	while (counter < length) {
		str += characters.charAt(Math.floor(Math.random() * charactersLength))
		counter += 1
	}
	return str
}

export const proccessFiles = async (files: File[]) => {
	return new Promise((resolve) => {
		const __process = async () => {
			let images: any[] = []

			files.forEach((file) => {
				if (file.type && !file.type.startsWith('image/')) {
					console.error('File is not an image.', file.type, file)
					return
				}
				let reader = new FileReader()

				reader.addEventListener(
					'load',
					() => {
						images.push(reader.result)
					},
					false
				)

				if (file) {
					reader.readAsDataURL(file)
				}
			})

			resolve(images)
		}
		__process()
	})
	// return images
}
