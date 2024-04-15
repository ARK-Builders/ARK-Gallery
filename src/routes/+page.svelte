<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte'
	import Filter from '$lib/components/Filter.svelte'
	import Actions from '$lib/components/Actions.svelte'
	import TagsList from '$lib/components/TagsList.svelte'
	import Header from '$lib/components/gallery/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import ImageEditor from '$lib/components/gallery/ImageEditor.svelte'
	import Slider from '$lib/components/ui/slider/slider.svelte'

	import { open } from '@tauri-apps/api/dialog'
	import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
	import { readDir } from '@tauri-apps/api/fs'
	import { listen } from '@tauri-apps/api/event'

	import { makeid } from '$lib/utils/tools'
	import { galleryStore } from '$lib/store'
	import type { ImageType } from '$lib/utils/types'
	import { askDeleteImage, askDeleteTag, filterImageWithTag } from '$lib/actions'

	let zoomLevel: number[] = [$galleryStore.zoomLevel]

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

	$: if ($galleryStore.selectedTag) {
		filterImageWithTag()
	}

	let showInfo = false
</script>

<svelte:head>
	<title>ARK Gallery 1.0</title>
</svelte:head>

<div class="flex h-screen w-full flex-col justify-start">
	{#if imageDropping}
		<div
			class="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-blue-300 bg-opacity-50"
		>
			<p class="text-2xl font-bold text-white">Drop your images here</p>
		</div>
	{/if}
	<div
		class:hidden={$galleryStore.galleryView}
		class="mx-auto flex h-full w-full max-w-7xl flex-col justify-start p-5"
	>
		<Filter />
		<div class="mt-10">
			<Actions
				on:upload={() => uploadFolder()}
				on:deleteImage={() => askDeleteImage()}
				on:deleteTag={() => askDeleteTag()}
			/>
		</div>
		<div class="my-5">
			<TagsList />
		</div>
		<div class="flex-1 overflow-auto p-1">
			<Gallery />
		</div>

		<div class="flex flex-col items-end justify-center pt-4">
			<Footer />
		</div>
	</div>
	<div class:hidden={!$galleryStore.galleryView}>
		<Header bind:showInfo />
		<ImageEditor bind:showInfo />
	</div>
</div>
