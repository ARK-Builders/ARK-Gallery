<script lang="ts">
	import Fa from 'svelte-fa'
	import {faImage} from '@fortawesome/free-regular-svg-icons'
</script>
<div class="flex flex-col max-w-7xl p-5 w-full rounded-md">
	<div class="flex flex-row gap-5 px-5 justify-end mt-10">
		<button class="flex flex-row items-center text-white gap-2 rounded-lg bg-blue-400 hover:bg-blue-600 px-4 py-2">
			<Fa icon={faImage} />
			<span>Select images</span>
		</button>
	</div>

</div>