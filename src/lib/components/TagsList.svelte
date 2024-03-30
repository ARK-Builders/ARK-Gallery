<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { onMount } from 'svelte'

	let tags: string[] = []

	onMount(() => {
		let tagsData = localStorage.getItem('tags')
		tags = JSON.parse(tagsData || '[]')
		$galleryStore.tags = tags
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

<div class="my-5 flex flex-row flex-wrap items-center gap-3">
	{#if $galleryStore.activeFilter == 'tag' && $galleryStore.tags.length}
		{#each $galleryStore.tags as tag}
			<button
				on:click={() => handleSelectTag(tag)}
				class="flex h-9 items-center rounded border border-[#94A3B8] px-3
				{$galleryStore.selectedTag == tag ? 'bg-blue-400 text-white' : ''}"
			>
				{tag}
			</button>
		{/each}
	{/if}
</div>
