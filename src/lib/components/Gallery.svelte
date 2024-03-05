<script lang="ts">
	import { galleryStore } from '$lib/store'
	import Image from '$lib/components/Image.svelte'
</script>

{#if $galleryStore.images?.length}
	<div
		class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 px-2 gap-3 mt-10 max-h-[520px] overflow-auto"
	>
		{#each $galleryStore.images as image, i}
			<Image bind:image />
		{/each}
	</div>
{/if}
