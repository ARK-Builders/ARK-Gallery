<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte'
	import Filter from '$lib/components/Filter.svelte'
	import Actions from '$lib/components/Actions.svelte'
	import TagsList from '$lib/components/TagsList.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import DeleteModal from '$lib/components/DeleteModal.svelte'
	import { open } from '@tauri-apps/api/dialog'
	import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
	import { readDir } from '@tauri-apps/api/fs'
	import { listen } from '@tauri-apps/api/event'
	import { makeid } from '$lib/utils/tools'
	import { galleryStore } from '$lib/store'
	import type { ImageType } from '$lib/utils/types'

	let imageDropping = false
	let deleteModal = false
	let images: ImageType[] = []
	let selectedImage: ImageType | null = null
	let sort = { value: '' }
	let selectedTags: string[] = []
	let zoomLevel = [100]

	listen('tauri://file-drop-hover', (e) => {
		imageDropping = true
	})

	listen('tauri://file-drop-cancelled', (e) => {
		imageDropping = false
	})

	listen('tauri://file-drop', async (e) => {
		imageDropping = false

		const payload = e.payload as string[]

		const dirs = []
		const imgs = []

		for (const file of payload) {
			const metadata: {
				file_type: string
				file_size: number
				created_time: string
				modified_time: string
				accessed_time: string
			} = await invoke('get_file_metadata', { filePath: file })

			if (metadata.file_type === 'directory') {
				dirs.push(file)
			} else {
				imgs.push(file)
			}
		}

		dirs.length && (await loadDirs(dirs)).forEach((path) => imgs.push(path))

		$galleryStore.images = await loadImages(imgs)
	})

	const loadDirs = async (paths: string[]): Promise<string[]> => {
		return (
			await Promise.allSettled(
				paths.map(async (folder) => {
					return (await readDir(folder))
						.map((file) => file.path)
						.filter(
							(file) =>
								file.endsWith('.png') ||
								file.endsWith('.jpeg') ||
								file.endsWith('.jpg') ||
								file.endsWith('.gif') ||
								file.endsWith('.webp')
						)
				})
			)
		)
			.map((item) => {
				if (item.status === 'rejected') {
					console.error(`ERROR: while reading folder: ${item.reason}`)
				}
				return item
			})
			.filter((item): item is PromiseFulfilledResult<string[]> => item.status === 'fulfilled')
			.map((item) => (item.status === 'fulfilled' ? item.value : null))
			.filter((item): item is string[] => item !== null)
			.flat()
	}

	const loadImages = async (paths: string[]): Promise<ImageType[]> => {
		const output: PromiseSettledResult<ImageType>[] = await Promise.allSettled(
			paths.map(async (file) => {
				const metadata: {
					file_type: string
					file_size: number
					created_time: string
					modified_time: string
					accessed_time: string
				} = await invoke('get_file_metadata', { filePath: file })

				return {
					id: makeid(5),
					src: convertFileSrc(file),
					name: file,
					size: metadata.file_size,
					lastModified: metadata.modified_time,
					type: metadata.file_type,
					tags: [],
					path: file
				} as ImageType
			})
		)

		return output
			.map((item) => {
				if (item.status === 'rejected') {
					console.error(`ERROR: while reading folder: ${item.reason}`)
				}
				return item
			})
			.filter((item): item is PromiseFulfilledResult<ImageType> => item.status === 'fulfilled')
			.map((item) => (item.status === 'fulfilled' ? item.value : null))
			.filter((item): item is ImageType => item !== null && item.type !== 'directory')
	}

	const uploadFolder = async () => {
		let selected = await open({
			multiple: true,
			directory: true
		})

		if (Array.isArray(selected) && selected.length) {
			const values = await loadDirs(selected)
			$galleryStore.images = await loadImages(values)
		}
	}

	function insertTag(id: string, tag: string) {
		const image = $galleryStore.images.find((img) => img.id === id)

		if (image) {
			if (!image.tags.includes(tag)) {
				image.tags.push(tag)
			}
		}

		$galleryStore.images = [...$galleryStore.images]
	}

	function deleteTag(id: string, tag: string) {
		const image = $galleryStore.images.find((img) => img.id === id)

		if (image) {
			image.tags = image.tags.filter((t) => t !== tag)
		}
		$galleryStore.images = [...$galleryStore.images]
	}

	$: {
		images = $galleryStore.images

		switch (sort.value) {
			case 'date':
				images = $galleryStore.images.sort((a: ImageType, b: ImageType) => {
					return Number(a.lastModified) - Number(b.lastModified)
				})
				break
			case 'size':
				images = $galleryStore.images.sort((a: ImageType, b: ImageType) => {
					return a.size - b.size
				})
				break
			case 'name':
				images = $galleryStore.images.sort((a: ImageType, b: ImageType) => {
					return ('' + a.name).localeCompare(b.name)
				})
				break
			case 'tag':
				images = $galleryStore.images.filter((img) => {
					return selectedTags.every((tag) => img.tags.includes(tag))
				})
				
				break
			default:
				images = $galleryStore.images
				break
		}

		if (selectedImage && !images.includes(selectedImage)) {
			selectedImage = null
		}
	}
</script>

<svelte:head>
	<title>ARK Gallery 1.0</title>
</svelte:head>

<DeleteModal
	show={deleteModal}
	on:abort={() => {
		deleteModal = false
	}}
	on:softDelete={async () => {
		if (selectedImage?.path) {
			await invoke('move_file_to_trash', { filePath: selectedImage.path })
			$galleryStore.images = $galleryStore.images.filter(
				(img) => selectedImage && img.path !== selectedImage.path
			)
			deleteModal = false
		}
	}}
/>

<div class="flex h-screen w-full flex-col justify-start">
	{#if imageDropping}
		<div
			class="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-blue-300 bg-opacity-50"
		>
			<p class="text-2xl font-bold text-white">Drop your images here</p>
		</div>
	{/if}
	<div class="mx-auto flex h-full w-full max-w-7xl flex-col justify-start p-5">
		<Filter bind:sort />
		<div class="mt-10">
			<Actions
				hasImages={$galleryStore.images.length > 0}
				on:upload={() => uploadFolder()}
				on:deleteImage={() => {
					if (selectedImage) {
						deleteModal = true
					}
				}}
			/>
		</div>
		<div class="my-5">
			{#if sort.value === 'tag'}
				<TagsList bind:selectedTags />
			{/if}
		</div>

		<div class="flex-1 overflow-auto p-1">
			<Gallery
				{images}
				{zoomLevel}
				bind:selectedImage
				on:newTag={(e) => {
					insertTag(e.detail.id, e.detail.tag)
				}}
				on:deleteTag={(e) => {
					deleteTag(e.detail.id, e.detail.tag)
				}}
			/>
		</div>

		<div class="flex flex-col items-end justify-center pt-4">
			<Footer bind:zoomLevel />
		</div>
	</div>
</div>
