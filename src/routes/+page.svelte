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
	import Header from '$lib/components/gallery/Header.svelte'

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
</script>

<svelte:head>
	<title>ARK Gallery 1.0</title>
</svelte:head>

<div class="mx-auto flex h-screen w-full flex-col justify-between rounded-md">
	<div class:hidden={$galleryStore.galleryView} class="mx-auto w-full max-w-7xl p-5">
		<Filter />
		<Actions
			on:upload={() => uploadFolder()}
			on:deleteImage={() => deleteImage()}
			on:deleteTag={() => deleteTag()}
		/>
		<TagsList />
		<Gallery />
	</div>
	<div class:hidden={!$galleryStore.galleryView}>
		<Header />
	</div>
	<div class="flex flex-row justify-end py-10">
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
