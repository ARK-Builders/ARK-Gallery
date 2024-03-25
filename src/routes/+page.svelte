<script lang="ts">
	import { makeid, openDirectory } from '$lib/utils/tools'
	import Gallery from '$lib/components/Gallery.svelte'
	import Filter from '$lib/components/Filter.svelte'
	import Actions from '$lib/components/Actions.svelte'
	import { galleryStore } from '$lib/store'
	import { Slider } from '$lib/components/ui/slider'
	import type { ImageType } from '$lib/utils/types'
	import TagsList from '$lib/components/TagsList.svelte'
	import { toast } from 'svelte-sonner'
	import { LocalStorageDB } from '$lib/utils/localstorage'

	let images: ImageType[] = []
	let zoomLevel: number[] = [$galleryStore.zoomLevel]

	const uploadFolder = async () => {
		images = []
		$galleryStore.images = []
		const filesDir: File[] = (await openDirectory()) as File[]

		$galleryStore.fileInfos = filesDir

		if (filesDir && filesDir.length) {
			filesDir.forEach((file) => {
				if (file.type && !file.type.startsWith('image/')) {
					console.log('File is not an image.', file.type, file)
					toast.error('One of file is not an image')
					return
				}
				var reader = new FileReader()

				reader.addEventListener(
					'load',
					function () {
						let { name, size, lastModified, type } = file
						images.push({
							id: makeid(5),
							src: reader.result,
							tag: '',
							name,
							size,
							lastModified,
							type
						})
						$galleryStore.images = images
					},
					false
				)

				if (file) {
					reader.readAsDataURL(file)
				}
			})
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
			const inUse = $galleryStore.images.find((image) => image.tag == $galleryStore.selectedTag)
			if (!inUse) {
				const tags = new LocalStorageDB('tags')
				tags.delete($galleryStore.selectedTag)
				$galleryStore.tags = tags.getAll()
				// resetting filtered images store
				$galleryStore.selectedTag = ''
				$galleryStore.selectedFilteredImages = []
				toast.warning('Deleted Tag Successfully')
			} else {
				toast.warning("Can't delete! Tag is in use")
			}
		}
	}

	$: if ($galleryStore.selectedTag) {
		if ($galleryStore.images.length) {
			let filtered = $galleryStore.images.filter((image) => image.tag == $galleryStore.selectedTag)
			$galleryStore.selectedFilteredImages = filtered
		}
	}
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
