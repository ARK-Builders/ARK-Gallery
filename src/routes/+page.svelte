<script lang="ts">
	import { makeid, openDirectory } from '$lib/utils/tools'
	import Gallery from '$lib/components/Gallery.svelte'
	import Filter from '$lib/components/Filter.svelte'
	import Actions from '$lib/components/Actions.svelte'
	import { galleryStore } from '$lib/store'
	import type { ImageType } from '$lib/utils/types'
	import TagsList from '$lib/components/TagsList.svelte'
	import { toast } from 'svelte-sonner'
	import Header from '$lib/components/gallery/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import ImageEditor from '$lib/components/gallery/ImageEditor.svelte'
	import { askDeleteImage, askDeleteTag } from '$lib/actions'

	let images: ImageType[] = []

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

	$: if ($galleryStore.selectedTag) {
		if ($galleryStore.images.length) {
			let filtered = $galleryStore.images.filter((image) => image.tag == $galleryStore.selectedTag)
			$galleryStore.selectedFilteredImages = filtered
		}
	}

	let showInfo = false
</script>

<svelte:head>
	<title>ARK Gallery 1.0</title>
</svelte:head>

<div class="mx-auto flex h-screen w-full flex-col justify-between rounded-md">
	<div class:hidden={$galleryStore.galleryView} class="mx-auto w-full max-w-7xl p-5">
		<Filter />
		<Actions
			on:upload={() => uploadFolder()}
			on:deleteImage={() => askDeleteImage()}
			on:deleteTag={() => askDeleteTag()}
		/>
		<TagsList />
		<Gallery />
	</div>
	<div class:hidden={!$galleryStore.galleryView}>
		<Header bind:showInfo />
		<ImageEditor bind:showInfo />
	</div>
	<Footer />
</div>
