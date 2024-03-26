<script lang="ts">
	import { Tooltip, TooltipTrigger, TooltipContent } from '$lib/components/ui/tooltip'
	export let hidden = false
</script>

<Tooltip openDelay={300}>
	<TooltipTrigger class={hidden ? 'hidden' : ''}>
		<slot name="tip-trigger" />
	</TooltipTrigger>
	{#if $$slots['tip-text']}
		<TooltipContent>
			<slot name="tip-text" />
		</TooltipContent>
	{/if}
</Tooltip>
