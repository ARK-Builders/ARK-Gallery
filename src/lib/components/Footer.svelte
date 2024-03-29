<script lang="ts">
	import Slider from '$lib/components/ui/slider/slider.svelte'
	import { galleryStore } from '$lib/store'

	let zoomLevel: number[] = [$galleryStore.zoomLevel]
</script>

<div class="flex flex-row justify-end py-10 mx-auto w-full max-w-7xl">
	<Slider
		bind:value={zoomLevel}
		onValueChange={(e) => ($galleryStore.zoomLevel = e[0])}
		class="w-80"
		max={130}
		min={80}
		step={1}
	/>
</div>
