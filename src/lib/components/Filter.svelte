<script lang="ts">
	import { galleryStore } from '$lib/store'
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectLabel,
		SelectTrigger,
		SelectValue
	} from '$lib/components/ui/select'
	import type { Selected } from 'bits-ui'

	export let filter: Selected<string> = { value: '' }

	const filters = [
		{ value: 'date', label: 'date' },
		{ value: 'map', label: 'map' },
		{ value: 'name', label: 'name' },
		{ value: 'size', label: 'size' },
		{ value: 'tag', label: 'tag' }
	]

	// const filters = ['date', 'map', 'name', 'size', 'tag']

	const updateFilter = async () => {
		let _images = $galleryStore.images

		switch (filter.value) {
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
			case 'name':
				_images.sort((a: File, b: File) => {
					return ('' + a.name).localeCompare(b.name)
				})
				break
			case 'tag':
				_images.sort((a: any, b: any) => {
					return ('' + a.tag).localeCompare(b.tag)
				})
				break
			default:
				break
		}
		$galleryStore.images = _images
	}
	$: filter, updateFilter()
</script>

<div class="flex flex-row items-center w-full rounded-full shadow-lg bg-white py-2 px-10">
	<p>Show</p>

	<!-- <select bind:value={filter} on:change={() => updateFilter()} class="outline-none px-1 pb-[1px]">
		<option value="">All photos</option>
		{#each filters as _filter}
			<option value={_filter}>By {_filter}</option>
		{/each}
	</select> -->
	<Select bind:selected={filter}>
		<SelectTrigger class="w-32 flex border-none focus:ring-0 focus:ring-offset-0">
			<SelectValue class="text-base" placeholder="All photos"></SelectValue>
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel class="pl-7">All photos</SelectLabel>
				{#each filters as filter}
					<SelectItem class="cursor-pointer" value={filter.value} label={filter.label}
						>by {filter.label}</SelectItem
					>
				{/each}
			</SelectGroup>
		</SelectContent>
	</Select>
</div>
