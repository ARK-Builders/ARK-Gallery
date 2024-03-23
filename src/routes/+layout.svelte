<script>
	import QuestionModal from '$lib/components/QuestionModal.svelte'
	import { galleryStore } from '$lib/store'
	import '../app.css'
</script>

<main class="flex bg-gray-100">
	<slot />
	{#if $galleryStore.modal}
		<QuestionModal />
	{/if}
</main>
