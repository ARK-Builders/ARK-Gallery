<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faCalendarAlt, faFileAlt } from '@fortawesome/free-regular-svg-icons'
	import { faListNumeric, faTag } from '@fortawesome/free-solid-svg-icons'
	import DetailField from '$lib/components/gallery/DetailField.svelte'
</script>

<div class="flex w-56 flex-col gap-7 rounded-xl bg-white px-6 py-5 shadow-lg">
	<DetailField icon={faCalendarAlt} text="Date" value={$galleryStore.selectedImage?.lastModified} />
	<DetailField icon={faTag} text="Tag" value={$galleryStore.selectedImage?.tag} />
	<DetailField icon={faListNumeric} text="Size" value={$galleryStore.selectedImage?.size} />
	<DetailField icon={faFileAlt} text="Format" value={$galleryStore.selectedImage?.type} />
</div>
