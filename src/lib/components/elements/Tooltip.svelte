<script lang="ts">
	import { Tooltip, TooltipTrigger, TooltipContent } from '$lib/components/ui/tooltip'
</script>

<Tooltip openDelay={300}>
	<TooltipTrigger>
		<slot name="tip-trigger" />
	</TooltipTrigger>
	{#if $$slots['tip-text']}
		<TooltipContent>
			<slot name="tip-text" />
		</TooltipContent>
	{/if}
</Tooltip>
