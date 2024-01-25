<script lang="ts">
	import { openDirectory } from '$lib/utils/tools'
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
						images.push(reader.result)
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

	// $: console.log(images)
</script>

<svelte:head>
	<title>ARK Gallery 1.0</title>
</svelte:head>

<div class="flex flex-col max-w-7xl p-5 w-full rounded-md mx-auto h-screen">
	<Filter />
	<Actions on:upload={() => uploadFolder()} />
	<Gallery />
</div>
