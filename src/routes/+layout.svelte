<script>
	import Modal from '$lib/components/Modal.svelte'
	import { galleryStore } from '$lib/store'
	import '../app.css'
</script>

<main class="flex bg-gray-100">
	<slot />
	{#if $galleryStore.modal}
		<Modal />
	{/if}
</main>
