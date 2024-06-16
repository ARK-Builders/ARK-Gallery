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

	export let sort: Selected<string> = { value: '' }

	const filters = [
		{ value: 'date', label: 'date' },
		{ value: 'map', label: 'map' },
		{ value: 'name', label: 'name' },
		{ value: 'size', label: 'size' },
		{ value: 'tag', label: 'tag' }
	]
</script>

<div class="flex w-full flex-row items-center rounded-full bg-white px-10 py-3 shadow-lg">
	<p>Show:</p>

	<Select bind:selected={sort}>
		<SelectTrigger
			asChild
			let:builder
			class="flex w-32 border-none focus:ring-0 focus:ring-offset-0"
			disabled={!$galleryStore.images.length}
		>
			<div
				class="w-28 cursor-pointer px-2 text-base
				{!$galleryStore.images.length && 'pointer-events-none opacity-70'}"
				use:builder.action
				{...builder}
			>
				{sort.value != '' ? 'By ' + sort.value : 'All Photos'}
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
