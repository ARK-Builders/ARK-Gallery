<script lang="ts">
	import { faCalendarAlt, faFileAlt } from '@fortawesome/free-regular-svg-icons'
	import { faCompress, faListNumeric, faTag } from '@fortawesome/free-solid-svg-icons'
	import DetailField from '$lib/components/gallery/DetailField.svelte'
	import dayjs from 'dayjs'
	import type { ImageType } from '$lib/utils/types'

	export let image: ImageType
</script>

<div class="flex w-56 flex-col gap-7 rounded-xl bg-white px-6 py-5 shadow-lg">
	<DetailField
		icon={faCalendarAlt}
		text="Date"
		value={dayjs(image?.lastModified).format('DD MMM YYYY')}
	/>
	<DetailField
		icon={faTag}
		text="Tag"
		value={image?.tags.reduce((acc, tag) => acc + tag + ', ', '').slice(0, -2)}
	/>
	<DetailField icon={faListNumeric} text="Size" value={image?.resolution} />
	<DetailField icon={faFileAlt} text="Format" value={image?.type} />
	<DetailField icon={faCompress} text="EXIF" value={image?.compression} />
</div>
