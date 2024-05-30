<script lang="ts">
	import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import { faHomeAlt, faInfoCircle, faMultiply } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { createEventDispatcher } from 'svelte'
	import { Undo, Redo, Download } from 'lucide-svelte'
	import { goto } from '$app/navigation'
	import type { ImageType } from '$lib/utils/types'
	import Tooltip from '../elements/Tooltip.svelte'

	export let showInfo = false
	export let tabs: ImageType[] = []
	export let activeTab = 0

	const dispatch = createEventDispatcher()
</script>

<div class="flex flex-col">
	<div class="mx-auto flex h-16 w-full max-w-7xl flex-row items-center gap-5 px-5">
		<button class="" on:click={() => goto('/')}>
			<Fa icon={faHomeAlt} class="hover:text-gray-500" />
		</button>

		<div class="flex h-full flex-row gap-1 overflow-y-auto">
			{#each tabs as viewedImage, i}
				<Tooltip>
					<button
						slot="tip-trigger"
						on:click={() => {
							activeTab = i
						}}
						class="relative flex h-full w-44 items-center rounded-lg px-3"
					>
						<span class="w-full truncate">
							{viewedImage.name}
						</span>
						<button
							on:click|stopPropagation={() => {
								// Tabs not working as expected
								// TODO: Fix tabs
								// tabs = tabs.filter((tab) => tab !== viewedImage)
								tabs = []
								goto('/')
							}}
							class="absolute right-1 top-1"
						>
							<Fa icon={faMultiply} size=".8x" />
						</button>
					</button>
					<span slot="tip-text">{viewedImage.name}</span>
				</Tooltip>
			{/each}
		</div>
	</div>
	<div class="flex h-16 bg-blue-400 px-5 text-white">
		<div class="mx-auto flex w-full max-w-7xl flex-row items-center justify-end gap-4">
			<button class="h-8" disabled>
				<Undo />
			</button>
			<button class="h-8" disabled>
				<Redo />
			</button>
			<button
				class="h-8 {showInfo && 'border-b border-white'}"
				on:click={() => (showInfo = !showInfo)}
			>
				<Fa icon={faInfoCircle} />
			</button>
			<button
				class="h-8"
				on:click={() => {
					dispatch('delete')
				}}
			>
				<Fa icon={faTrashAlt} />
			</button>
			<!-- {#if $galleryStore.isEditing}
				<button class="h-8">
					<Download size="18" />
				</button>
			{/if} -->
		</div>
	</div>
</div>
