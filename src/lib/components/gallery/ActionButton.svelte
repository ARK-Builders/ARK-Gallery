<script lang="ts">
	import type { IconDefinition } from '@fortawesome/free-regular-svg-icons'
	import Fa from 'svelte-fa'

	type Method = () => void

	export let text: string = ''
	export let icon: IconDefinition | null = null
	export let onClick: Method | null = null

	let hover = false
</script>

<button
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
	class="flex flex-col items-center gap-3 hover:text-gray-500"
	on:click={() => (onClick ? onClick() : '')}
>
	{#if icon}
		<Fa {icon} class="text-gray-700 {hover && 'text-gray-500'}" />
	{/if}

	<span class="text-sm font-light">{text}</span>
</button>
