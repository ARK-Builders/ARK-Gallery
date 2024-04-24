<script lang="ts">
	import { flip } from 'svelte/animate'
	import { quintOut } from 'svelte/easing'
	import { goto } from '$app/navigation'
	import type { ImageType } from '$lib/utils/types'
	import { faPlus } from '@fortawesome/free-solid-svg-icons'
	import { createEventDispatcher } from 'svelte'
	import Fa from 'svelte-fa'

	export let isSelected = false
	export let image: ImageType

	let hasHover = false

	let newTag = ''

	const dispatch = createEventDispatcher()
</script>

<button
	on:focus
	on:mouseover={() => (hasHover = true)}
	on:mouseleave={() => (hasHover = false)}
	on:click
	on:dblclick={() => {
		goto('/view?image=' + image.id)
	}}
	{...$$restProps}
	class:outline={isSelected}
	class="relative flex flex-col rounded-md bg-gray-100 outline-blue-200 hover:outline"
>
	<img
		class="h-full w-full cursor-pointer duration-150"
		src={image.src?.toString()}
		alt="image {image.name}"
	/>
	{#if hasHover}
		<div class="absolute bottom-0 left-0 right-0 z-10 translate-y-full">
			{#each image.tags as tag (tag)}
				<div>{tag}</div>
			{/each}
		</div>
	{/if}
	<div
		class:hidden={!hasHover}
		class="absolute bottom-0 flex w-full items-center justify-start gap-1 bg-white px-2 text-black"
	>
		<span class="left-1 text-lg">#</span>
		<input
			bind:value={newTag}
			type="text"
			class="w-full flex-1 bg-transparent focus:outline-none"
		/>
		<button
			on:click={() => {
				dispatch('newTag', newTag)
				newTag = ''
			}}
		>
			<Fa icon={faPlus} />
		</button>
	</div>
</button>
