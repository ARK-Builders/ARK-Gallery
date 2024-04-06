<script lang="ts">
	import { makeid } from '$lib/utils/tools'
	import Gallery from '$lib/components/Gallery.svelte'
	import Filter from '$lib/components/Filter.svelte'
	import Actions from '$lib/components/Actions.svelte'
	import { galleryStore } from '$lib/store'
	import { Slider } from '$lib/components/ui/slider'
	import { open } from '@tauri-apps/api/dialog'
	import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
	import TagsList from '$lib/components/TagsList.svelte'
	import { readDir } from '@tauri-apps/api/fs'
	import { listen } from '@tauri-apps/api/event'
	import type { ImageType } from '$lib/utils/types'

	let imageDropping = false

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
		const images = []

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
				images.push(file)
			}
		}

		dirs.length && (await loadDirs(dirs)).forEach((path) => images.push(path))

		$galleryStore.images = await loadImages(images)
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
					tag: '' as string
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

	const deleteImage = () => {
		if ($galleryStore.selectedImage) {
			$galleryStore.questionModalProp = 'deleteImage'
			$galleryStore.modalQuestion = 'Are you sure want to delete that image?'
			$galleryStore.modal = true
			return
		}
	}

	const deleteTag = () => {
		if ($galleryStore.selectedTag) {
			$galleryStore.questionModalProp = 'deleteTag'
			$galleryStore.modalQuestion = 'Are you sure want to delete that tag?'
			$galleryStore.modal = true
		}
	}
	$: if ($galleryStore.selectedTag) {
		if ($galleryStore.images.length) {
			let filtered = $galleryStore.images.filter((image) => image.tag == $galleryStore.selectedTag)
			$galleryStore.selectedFilteredImages = filtered
		}
	}

	let zoomLevel: number[] = [$galleryStore.zoomLevel]
</script>

<svelte:head>
	<title>ARK Gallery 1.0</title>
</svelte:head>

<div class="flex flex-col justify-between max-w-7xl p-5 w-full rounded-md mx-auto h-screen">
	{#if imageDropping}
		<div
			class="absolute top-0 left-0 w-full h-full bg-blue-300 bg-opacity-50 z-50 flex items-center justify-center"
		>
			<p class="text-2xl font-bold text-white">Drop your images here</p>
		</div>
	{/if}

	<Filter />
	<Actions
		on:upload={() => uploadFolder()}
		on:deleteImage={() => deleteImage()}
		on:deleteTag={() => deleteTag()}
	/>
	<TagsList />
	<Gallery />
	<div class="flex py-10 flex-row justify-end">
		<Slider
			bind:value={zoomLevel}
			onValueChange={(e) => ($galleryStore.zoomLevel = e[0])}
			class="w-80"
			max={130}
			min={80}
			step={1}
		/>
	</div>
</div>
