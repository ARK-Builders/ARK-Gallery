<script>
	import Header from "$lib/components/gallery/Header.svelte"
	import ImageEditor from "$lib/components/gallery/ImageEditor.svelte"

    let showInfo = false
</script>
<div class="flex h-screen w-full flex-col justify-start">
	<Header bind:showInfo />
	<ImageEditor bind:showInfo />
</div>
