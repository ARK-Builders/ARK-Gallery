<script lang="ts">
	import { goto } from '$app/navigation'
	import type { ImageType } from '$lib/utils/types'
	import { faPlus } from '@fortawesome/free-solid-svg-icons'
	import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import Fa from 'svelte-fa'
	import { createEventDispatcher } from 'svelte'

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
	class:outline={isSelected && !hasHover}
	class={`relative flex flex-col rounded-md bg-gray-100 outline-blue-200 ${hasHover ? 'rounded-b-none' : ''}`}
>
	<img
		draggable="false"
		class="h-full max-h-40 w-full cursor-pointer duration-150"
		src={image.src?.toString()}
		alt="image {image.name}"
	/>
	{#if hasHover}
		<div class="absolute bottom-0 left-0 right-0 z-10 translate-y-full flex gap-[0.5px] flex-col">
			<div
				class="flex w-full items-center justify-start gap-1 bg-white px-2 text-black last:rounded-b-md"
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
			{#each image.tags as tag (tag)}
				<div
					class="flex w-full items-center justify-start gap-1 bg-white px-2 text-black last:rounded-b-md"
				>
					<span class="left-1 text-lg">#</span>
					<span class="w-full flex-1 bg-transparent text-left focus:outline-none">{tag}</span>
					<button
						on:click={() => {
							dispatch('deleteTag', tag)
						}}
					>
						<Fa icon={faTrashAlt} />
					</button>
				</div>
			{/each}
		</div>
	{/if}
</button>
