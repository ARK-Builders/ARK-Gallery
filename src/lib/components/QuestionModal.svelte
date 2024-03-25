<script lang="ts">
	import { faMultiply } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { galleryStore } from '$lib/store'
	import Button from '$lib/components/ui/button/button.svelte'

	let data: any
	let disabled: boolean = false

	const handleYes = () => {
		if ($galleryStore.questionModalProp == 'deleteImage') {
			const idx = $galleryStore.images
				.map((item: any) => item.id)
				.indexOf($galleryStore.selectedImage?.id)
			$galleryStore.images.splice(idx, 1)
			$galleryStore.images = $galleryStore.images
			$galleryStore.questionModalProp = ''
			$galleryStore.selectedImage = null
		} else if ($galleryStore.questionModalProp == 'deleteTag') {
			if ($galleryStore.selectedImage) {
				$galleryStore.selectedImage.tag = ''
			}
		}
		$galleryStore.modal = false
	}

	const handleNo = () => {
		$galleryStore.modal = false
		$galleryStore.selectedImage = null
	}
</script>

<div
	id="modal"
	tabindex="-1"
	class="flex overflow-y-auto overflow-x-hidden backdrop-blur-sm fixed bg-black bg-opacity-40 z-50 justify-center items-center w-screen h-screen"
>
	<div class="flex flex-col min-w-96 rounded-xl border shadow-sm pb-5 px-5 bg-white">
		<div class="flex flex-row mt-2 justify-end">
			<button on:click={() => handleNo()}>
				<Fa icon={faMultiply} />
			</button>
		</div>
		<div class="p-2">
			<p class="text text-center py-4">{$galleryStore.modalQuestion}</p>
		</div>
		<div class="flex flex-row gap-5 justify-center py-2">
			<Button on:click={() => handleNo()} variant={'outline'} class="w-32">No</Button>
			<Button class="w-32" on:click={() => handleYes()}>Yes</Button>
		</div>
	</div>
</div>
