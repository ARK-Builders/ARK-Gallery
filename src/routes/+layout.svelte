<script>
	import QuestionModal from '$lib/components/QuestionModal.svelte'
	import { galleryStore } from '$lib/store'
	import '../app.css'
	import { Toaster } from 'svelte-sonner'
</script>

<main class="flex bg-gray-100 font-sans">
	<slot />
	{#if $galleryStore.modal}
		<QuestionModal />
	{/if}
	<Toaster />
</main>
