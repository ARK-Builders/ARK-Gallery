<script lang="ts">
	import Slider from '$lib/components/ui/slider/slider.svelte'
	import { galleryStore } from '$lib/store'

	let zoomLevel: number[] = [$galleryStore.zoomLevel]
</script>

<Slider
	bind:value={zoomLevel}
	onValueChange={(e) => ($galleryStore.zoomLevel = e[0])}
	class="w-80"
	max={250}
	min={50}
	step={5}
/>
