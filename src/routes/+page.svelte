<script lang="ts">
	import Fa from 'svelte-fa'
	import { faImage } from '@fortawesome/free-regular-svg-icons'
	import { openDirectory } from '$lib/utils/tools'

	let images: any = []

	const uploadFolder = async () => {
		images = [];
		const filesDir: File[] = (await openDirectory()) as File[]
		console.log(filesDir)
		if (filesDir && filesDir.length) {
			filesDir.forEach((file) => {
				if (file.type && !file.type.startsWith('image/')) {
					console.log('File is not an image.', file.type, file)
					return
				}
				// console.log(file)

				var reader = new FileReader()

				reader.addEventListener(
					'load',
					function () {
						// preview.src = reader.result
						images.push(reader.result)
						images = images
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

<div class="flex flex-col max-w-7xl p-5 w-full rounded-md mx-auto">
	<div class="flex flex-row gap-5 justify-end mt-10">
		<button
			on:click={() => uploadFolder()}
			class="flex flex-row items-center text-white gap-2 rounded-lg bg-blue-400 hover:bg-blue-600 px-4 py-2"
		>
			<Fa icon={faImage} />
			<span>Select images</span>
		</button>
	</div>

	{#if images.length}
		<div class="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-3 mt-10">
			{#each images as image, i}
				<div class="flex rounded-lg h-32 bg-gray-200 p-1">
					<img
						class="w-full h-full object-cover rounded-lg cursor-pointer hover:outline hover:outline-blue-200 hover:scale-110"
						src={image}
						alt="image {i}"
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>
