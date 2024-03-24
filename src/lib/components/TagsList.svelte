<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { onMount } from 'svelte'

	let tags: string[] = []
	onMount(() => {
		let tagsData = localStorage.getItem('tags')
		tags = JSON.parse(tagsData || '[]')
		$galleryStore.tags = tags
		// tags = [...tags, ...tags, ...tags, ...tags, ...tags, ...tags]
		// tags = [...tags, ...tags, ...tags, ...tags, ...tags, ...tags]
	})

	const handleSelectTag = (tag: string) => {
		if ($galleryStore.selectedTag == tag) {
			$galleryStore.selectedTag = ''
			$galleryStore.selectedFilteredImages = []
		} else {
			$galleryStore.selectedTag = tag
		}
	}
</script>

<div class="flex flex-row flex-wrap gap-3 items-center my-5">
	{#if $galleryStore.activeFilter == 'tag' && $galleryStore.tags.length}
		{#each $galleryStore.tags as tag}
			<button
				on:click={() => handleSelectTag(tag)}
				class="h-9 flex items-center px-3 rounded border border-[#94A3B8]
				{$galleryStore.selectedTag == tag ? 'text-white bg-blue-400' : ''}"
			>
				{tag}
			</button>
		{/each}
	{/if}
</div>
