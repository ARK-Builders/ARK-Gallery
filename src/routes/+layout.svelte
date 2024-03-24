<script>
	import Modal from '$lib/components/Modal.svelte'
	import { galleryStore } from '$lib/store'
	import '../app.css'
	import { Toaster } from 'svelte-sonner'
</script>

<main class="flex bg-gray-100">
	<slot />
	{#if $galleryStore.modal}
		<Modal />
	{/if}
	<Toaster />
</main>
