<script lang="ts">
	import Slider from '$lib/components/ui/slider/slider.svelte'
	export let zoomLevel = [100]
</script>

<Slider
	bind:value={zoomLevel}
	onValueChange={(e) => (zoomLevel = e)}
	class="w-80"
	max={250}
	min={50}
	step={5}
/>
