<script lang="ts">
	import Slider from '$lib/components/ui/slider/slider.svelte'

	let blurValue: number = 0
	let blur: number[] = [blurValue]
	export let blurLevel: number = blurValue

	$: blurLevel = blurValue
</script>

<div class="flex w-56 flex-col gap-3 rounded-xl bg-white px-6 py-5 shadow-lg">
	<p>Blur</p>
	<div class="w-full rounded-lg bg-blue-300 px-5 py-1">
		<Slider
			bind:value={blur}
			onValueChange={(e) => (blurValue = e[0])}
			class="w-80"
			max={100}
			min={0}
			step={5}
		/>
	</div>
</div>
