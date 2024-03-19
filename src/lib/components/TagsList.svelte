<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { onMount } from 'svelte'

	let tags: string[] = []
	onMount(() => {
		let tagsData = localStorage.getItem('tags') || ''
		tags = JSON.parse(tagsData)
		// tags = [...tags, ...tags, ...tags, ...tags, ...tags, ...tags]
		// tags = [...tags, ...tags, ...tags, ...tags, ...tags, ...tags]
	})
</script>

<div class="flex flex-row flex-wrap gap-3 items-center my-5">
	{#if $galleryStore.activeFilter == 'tag' && tags.length}
		{#each tags as tag}
			<button
				on:click={() => console.log(tag)}
				class="h-9 flex items-center px-3 rounded border border-[#94A3B8]"
			>
				{tag}
			</button>
		{/each}
	{/if}
</div>
