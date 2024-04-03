<script lang="ts">
	import { makeid, openDirectory } from '$lib/utils/tools'
	import Gallery from '$lib/components/Gallery.svelte'
	import Filter from '$lib/components/Filter.svelte'
	import Actions from '$lib/components/Actions.svelte'
	import { galleryStore } from '$lib/store'
	import { Slider } from '$lib/components/ui/slider'
	import { open } from '@tauri-apps/api/dialog'
	import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
	import TagsList from '$lib/components/TagsList.svelte'
	import { readDir } from '@tauri-apps/api/fs'

	const uploadFolder = async () => {
		let selected = await open({
			multiple: true,
			directory: true
		})

		if (Array.isArray(selected) && selected.length) {
			const folder = selected[0]
			const values = (await readDir(folder))
				.map((file) => file.path)
				.filter(
					(file) =>
						file.endsWith('.png') ||
						file.endsWith('.jpeg') ||
						file.endsWith('.jpg') ||
						file.endsWith('.gif') ||
						file.endsWith('.webp')
				)

			const output = await Promise.allSettled(
				values.map(async (file) => {
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
						type: metadata.file_type
					}
				})
			)

			$galleryStore.images = output
				.map((item) => {
					if (item.status === 'rejected') {
						console.error(
							`Error while reading file: ${item.reason.message}.\nFile: ${item.reason.file}`
						)
					}
					return item
				})
				.filter((item) => item.status === 'fulfilled')
				.map((item) => item.status === 'fulfilled' && item.value)
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
	<div>
		<Filter />
		<Actions
			on:upload={() => uploadFolder()}
			on:deleteImage={() => deleteImage()}
			on:deleteTag={() => deleteTag()}
		/>
		<TagsList />
		<Gallery />
	</div>
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
