<script lang="ts">
	import { galleryStore } from '$lib/store'
	import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
	import Fa from 'svelte-fa'

	export let image: any
	let hasHover = false
</script>

<div
	role="img"
	on:focus
	on:mouseover={() => (hasHover = true)}
	on:mouseleave={() => (hasHover = false)}
	class="flex flex-col relative rounded-md h-36 bg-gray-100"
>
	<button
		on:click={() => ($galleryStore.selectedImage = image)}
		class:outline={$galleryStore.selectedImage == image}
		class="w-full h-full rounded-md hover:outline outline-blue-200"
	>
		<img
			class="w-full h-full object-cover rounded-md cursor-pointer duration-150"
			src={image.src}
			alt="image {image.name}"
		/>
		<div
			class:hidden={!hasHover && !image.tag}
			class="absolute bottom-0 bg-black text-white bg-opacity-40 flex items-center w-full rounded-bl-md rounded-br-lg"
		>
			<span class="absolute left-1 text-lg">#</span>
			<input
				bind:value={image.tag}
				type="text"
				class="w-full py-1 pl-4 bg-transparent bottom-0 focus:outline-none"
			/>
			<button
				on:click={() => (image.tag = '')}
				class:hidden={!image.tag}
				class="absolute right-1 text-white"
			>
				<Fa icon={faTrashAlt} size=".8x" />
			</button>
		</div>
	</button>
</div>
