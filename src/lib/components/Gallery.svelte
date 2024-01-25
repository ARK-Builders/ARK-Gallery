<script lang="ts">
	export let images: string[] = []
</script>

<div class="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-3 mt-10">
	{#each images as image, i}
		<div class="flex rounded-lg h-32 bg-gray-200 p-1">
			<img
				class="w-full h-full object-cover rounded-lg cursor-pointer hover:outline hover:outline-blue-200 hover:scale-110"
				src={image}
				alt="image {i}"
			/>
		</div>
	{/each}
</div>
