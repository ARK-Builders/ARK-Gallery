<script lang="ts">
	import type { IconDefinition } from '@fortawesome/free-regular-svg-icons'
	import Fa from 'svelte-fa'

	export let text: string = ''
	export let value: string | number = ''
	export let icon: IconDefinition | null = null
</script>

<div class="flex w-full flex-col gap-4 border-b-2 border-gray-500 pb-1">
	<p class="flex items-center gap-3 font-light">
		{#if icon}
			<Fa {icon} />
		{/if}
		{text}
	</p>
	<p class="font-semibold">
		{value || ''}
	</p>
</div>
