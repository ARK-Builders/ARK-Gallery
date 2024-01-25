<script lang="ts">
	import { galleryStore } from '$lib/store'

	export let filter = ''

	const filters = ['date', 'map', 'name', 'size', 'tag']

	const updateFilter = () => {
		let _images = $galleryStore.fileInfos

		switch (filter) {
			case 'date':
				_images.sort((a: File, b: File) => {
					return a.lastModified - b.lastModified
				})
				break
			case 'size':
				_images.sort((a: File, b: File) => {
					return a.size - b.size
				})
				break
			default:
				break
		}

		console.log(_images)
		// $galleryStore.images = _images
	}
</script>

<div class="flex flex-row items-center w-full rounded-full shadow-lg bg-white py-3 px-10">
	<p>Show</p>
	<select bind:value={filter} on:change={() => updateFilter()} class="outline-none px-1 pb-[1px]">
		<option value="">All photos</option>
		{#each filters as _filter}
			<option value={_filter}>By {_filter}</option>
		{/each}
	</select>
</div>
