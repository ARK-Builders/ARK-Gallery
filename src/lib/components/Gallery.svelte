<script lang="ts">
	import { galleryStore } from '$lib/store'
	import Image from '$lib/components/Image.svelte'
</script>

{#if $galleryStore.images?.length}
	<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3 max-h-[60vh] overflow-auto">
		{#each $galleryStore.images as image, i}
			<Image bind:image />
		{/each}
	</div>
{/if}
