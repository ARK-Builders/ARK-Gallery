<script lang="ts">
	import { makeid, openDirectory } from '$lib/utils/tools'
	import Gallery from '$lib/components/Gallery.svelte'
	import Filter from '$lib/components/Filter.svelte'
	import Actions from '$lib/components/Actions.svelte'
	import { galleryStore } from '$lib/store'
	import { Slider } from '$lib/components/ui/slider'


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
