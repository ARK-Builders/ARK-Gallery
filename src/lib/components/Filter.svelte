<script lang="ts">
	import { galleryStore } from '$lib/store'
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectLabel,
		SelectTrigger
	} from '$lib/components/ui/select'
	import { type Selected } from 'bits-ui'

	export let filter: Selected<string> = { value: '' }

	const filters = [
		{ value: 'date', label: 'date' },
		{ value: 'map', label: 'map' },
		{ value: 'name', label: 'name' },
		{ value: 'size', label: 'size' },
		{ value: 'tag', label: 'tag' }
	]
	let tmr: number

	const updateFilter = async () => {
		let _images = $galleryStore.images
		$galleryStore.activeFilter = filter.value

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

		if (tmr) clearTimeout(tmr)
		tmr = setTimeout(() => {
			$galleryStore.images = _images
		}, 10)
	}
	$: filter, updateFilter()
</script>

<div class="flex flex-row items-center w-full rounded-full shadow-lg bg-white py-3 px-10">
	<p>Show:</p>

	<Select bind:selected={filter}>
		<SelectTrigger
			asChild
			let:builder
			class="w-32 flex border-none focus:ring-0 focus:ring-offset-0"
			disabled={!$galleryStore.images.length}
		>
			<div
				class="w-28 px-2 cursor-pointer text-base
				{!$galleryStore.images.length && 'pointer-events-none opacity-70'}"
				use:builder.action
				{...builder}
			>
				{filter.value != '' ? 'By ' + filter.value : 'All Photos'}
			</div>
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel class="pl-7">All photos</SelectLabel>
				{#each filters as filter}
					<SelectItem class="cursor-pointer" value={filter.value} label={filter.label}
						>By {filter.label}</SelectItem
					>
				{/each}
			</SelectGroup>
		</SelectContent>
	</Select>
</div>
