<script lang="ts">
	import { makeid, openDirectory } from '$lib/utils/tools'
	import Gallery from '$lib/components/Gallery.svelte'
	import Filter from '$lib/components/Filter.svelte'
	import Actions from '$lib/components/Actions.svelte'
	import { galleryStore } from '$lib/store'
	import { Slider } from '$lib/components/ui/slider'
	import { open } from '@tauri-apps/api/dialog'
	import { readBinaryFile } from '@tauri-apps/api/fs'
	import { invoke, convertFileSrc } from '@tauri-apps/api/tauri'
	import { CloudCog } from 'lucide-svelte'

	let images: any = []

	const uploadFolder = async () => {
		let selected = await open({
			multiple: true,
			filters: [
				{
					name: 'Image',
					extensions: ['png', 'jpeg', 'jpg', 'gif', 'webp']
				}
			]
		})

		if (!Array.isArray(selected)) {
			if (!selected) {
				selected = []
			} else {
				selected = [selected]
			}
		}

		if (Array.isArray(selected)) {
			const output = await Promise.allSettled(
				selected.map(async (file) => {
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
				.filter((item) => item.status === 'fulfilled')
				.map((item) => item.value)
		}
	}

	const deleteImage = () => {
		if ($galleryStore.selectedImage) {
			$galleryStore.modalQuestion = 'Are you sure want to delete that image?'
			$galleryStore.modal = true
			return
		}
	}

	$: if ($galleryStore.isDeleteImage == true) {
		const idx = $galleryStore.images
			.map((item: any) => item.id)
			.indexOf($galleryStore.selectedImage?.id)
		$galleryStore.images.splice(idx, 1)
		$galleryStore.images = $galleryStore.images
		$galleryStore.isDeleteImage = false
		$galleryStore.selectedImage = null
	}

	let zoomLevel: number[] = [$galleryStore.zoomLevel]
</script>

<svelte:head>
	<title>ARK Gallery 1.0</title>
</svelte:head>

<div class="flex flex-col justify-between max-w-7xl p-5 w-full rounded-md mx-auto h-screen">
	<div>
		<Filter />
		<Actions on:upload={() => uploadFolder()} on:delete={() => deleteImage()} />
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
