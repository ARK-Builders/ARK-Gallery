<script lang="ts">
	import { galleryStore } from "$lib/store"
</script>

{#if $galleryStore.images?.length}
<div class="grid grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-3 mt-10">
	{#each $galleryStore.images as image, i}
		<div class="flex flex-col rounded-md h-36 bg-gray-100 p-[2px]">
			<img
				class="w-full h-full object-cover rounded-md cursor-pointer duration-150 hover:outline hover:outline-blue-200 hover:scale-105"
				src={image.src}
				alt="image {i}"
			/>
			<p></p>
		</div>
	{/each}
</div>
{/if}
