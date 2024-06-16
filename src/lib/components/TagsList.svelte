<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	export let selectedTags: string[] = []

	let tags: string[] = []

	$: tags = $galleryStore.images.reduce((acc: string[], img) => {
		img.tags.forEach((tag) => {
			if (!acc.includes(tag)) {
				acc.push(tag)
			}
		})
		return acc
	}, [])
</script>

<div class="flex flex-row flex-wrap items-center gap-3">
	<button
		on:click={() => {
			selectedTags.length == 0 ? (selectedTags = tags) : (selectedTags = [])
		}}
		class="flex h-9 items-center rounded border border-[#94A3B8] px-3
				{selectedTags.length > 0 ? 'bg-blue-400 text-white' : ''}"
	>
		<Fa icon={selectedTags.length > 0 ? faMinus : faCheck} />
	</button>
	{#each tags as tag}
		<button
			on:click={() => {
				selectedTags.includes(tag)
					? (selectedTags = selectedTags.filter((t) => t !== tag))
					: (selectedTags = [...selectedTags, tag])
			}}
			class="flex h-9 items-center rounded border border-[#94A3B8] px-3
				{selectedTags.includes(tag) ? 'bg-blue-400 text-white' : ''}"
		>
			{tag}
		</button>
	{/each}
</div>
