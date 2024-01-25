<script lang="ts">
	import { galleryStore } from "$lib/store"
	import Image from "./Image.svelte"

</script>

{#if $galleryStore.images?.length}
<div class="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-3 mt-10">
	{#each $galleryStore.images as image, i}
		<Image bind:image />
	{/each}
</div>
{/if}
