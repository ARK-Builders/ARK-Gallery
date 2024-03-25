<script lang="ts">
	import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
</script>

<Tooltip openDelay={300}>
	<TooltipTrigger>
		<slot name="tip-trigger" />
	</TooltipTrigger>
	<TooltipContent>
		<slot name="tip-text" />
	</TooltipContent>
</Tooltip>
