<script lang="ts">
	import { makeid, openDirectory } from '$lib/utils/tools'
	import Gallery from '$lib/components/Gallery.svelte'
	import Filter from '$lib/components/Filter.svelte'
	import Actions from '$lib/components/Actions.svelte'
	import { galleryStore } from '$lib/store'

	let images: any = []

	const uploadFolder = async () => {
		images = []
		$galleryStore.images = []
		const filesDir: File[] = (await openDirectory()) as File[]

		$galleryStore.fileInfos = filesDir

		if (filesDir && filesDir.length) {
			filesDir.forEach((file) => {
				if (file.type && !file.type.startsWith('image/')) {
					console.log('File is not an image.', file.type, file)
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

	$: console.log($galleryStore.images)

	const deleteImage = () => {
		if ($galleryStore.selectedImage) {
			$galleryStore.modal = true;
			return

			const idx = $galleryStore.images
				.map((item: any) => item.id)
				.indexOf($galleryStore.selectedImage.id)
			$galleryStore.images.splice(idx, 1)
			$galleryStore.images = $galleryStore.images
		}
	}
</script>

<svelte:head>
	<title>ARK Gallery 1.0</title>
</svelte:head>

<div class="flex flex-col max-w-7xl p-5 w-full rounded-md mx-auto h-screen">
	<Filter />
	<Actions on:upload={() => uploadFolder()} on:delete={() => deleteImage()} />
	<Gallery />
</div>
