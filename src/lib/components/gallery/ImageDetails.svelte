<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faCalendarAlt, faFileAlt } from '@fortawesome/free-regular-svg-icons'
	import { faListNumeric, faTag } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
</script>

<div class="flex flex-col w-56 px-6 py-5 gap-5 bg-white rounded-xl shadow-lg">
	<div class="flex flex-col gap-3 border-b-2 w-full pb-1 border-gray-500">
		<p class="flex items-center gap-3">
			<Fa icon={faCalendarAlt} />
			Date
		</p>
		<p class="font-bold">
			{$galleryStore.selectedImage?.lastModified}
		</p>
	</div>
	<div class="flex flex-col gap-3 border-b-2 w-full border-gray-500 pb-1">
		<p class="flex items-center gap-3">
			<Fa icon={faTag} />
			Tag
		</p>
		<p class="font-bold">
			{$galleryStore.selectedImage?.tag}
		</p>
	</div>
	<div class="flex flex-col gap-3 border-b-2 w-full border-gray-500 pb-1">
		<p class="flex items-center gap-3">
			<Fa icon={faListNumeric} />
			Size
		</p>
		<p class="font-bold">
			{$galleryStore.selectedImage?.size}
		</p>
	</div>
	<div class="flex flex-col gap-3 border-b-2 w-full border-gray-500 pb-1">
		<p class="flex items-center gap-3">
			<Fa icon={faFileAlt} />
			Format
		</p>
		<p class="font-bold">
			{$galleryStore.selectedImage?.type}
		</p>
	</div>
</div>
