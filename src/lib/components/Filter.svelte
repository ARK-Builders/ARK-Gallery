<script lang="ts">
	export let filter = ''

	const filters = [
		'date',
		'map',
		'name',
		'size',
		'tag'
	]
</script>
<div class="flex flex-row items-center w-full rounded-full shadow-lg bg-white py-3 px-10">
	<p>Show</p>
	<select bind:value={filter} class="outline-none px-1 pb-[1px]">
		<option value="">All photos</option>
		{#each filters as _filter }
			<option value="{_filter}">By {_filter}</option>
		{/each}
	</select>
</div>