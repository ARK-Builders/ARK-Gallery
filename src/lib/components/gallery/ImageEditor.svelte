<script lang="ts">
	import { galleryStore } from '$lib/store'
	import {
		faChevronLeft,
		faChevronRight,
		faCropSimple,
		faDroplet,
		faPaintBrush,
		faRotateLeft,
		faRotateRight,
		faT
	} from '@fortawesome/free-solid-svg-icons'
	import ImageDetails from '$lib/components/gallery/ImageDetails.svelte'
	import ActionButton from '$lib/components/gallery/ActionButton.svelte'
	import Fa from 'svelte-fa'
	import { replaceImageInTab } from '$lib/actions'
	import { trimString } from '$lib/utils/tools'
	import BlurImagePanel from './BlurImagePanel.svelte'
	import ImageJs, { Image } from 'image-js'

	export let showInfo = false

	const ROTATE_90 = 'Rotate 90'
	const ROTATE_RIGHT = 'Rotate Right'
	const ROTATE_LEFT = 'Rotate Left'
	const BLUR = 'Blur'
	const BRUSH = 'Brush'
	const CROP = 'Crop'
	const TEXT = 'Text'

	let activeAction: string = ''
	let imageRef: HTMLImageElement | null = null
	let blurLevel = 0

	let rotate = false
	let rotateValue = 0
	let isEditing = false
	let imageObj: Image | null = null

	$: idx = $galleryStore.images.map((item: any) => item.id).indexOf($galleryStore.selectedImage?.id)

	$: if ($galleryStore.selectedImage?.src) {
		loadImage()
	}

	const loadImage = async () => {
		if ($galleryStore.selectedImage?.src) {
			imageObj = await ImageJs.load($galleryStore.selectedImage?.src)
		}
	}

	const saveImage = () => {
		if (imageObj) {
			imageObj.save('temp.jpg')
		}
	}

	const prevImage = () => {
		if (idx && $galleryStore.images.length > 0) {
			idx--
			$galleryStore.selectedImage = $galleryStore.images[idx]
			replaceImageInTab($galleryStore.activeTabIndex)
		}
	}

	const nextImage = () => {
		if (idx > -1 && idx < $galleryStore.images.length - 1) {
			idx++
			$galleryStore.selectedImage = $galleryStore.images[idx]
			replaceImageInTab($galleryStore.activeTabIndex)
		}
	}

	const toggleAction = (active: string) => {
		if (activeAction == trimString(active)) {
			activeAction = ''
			return true
		}
		return false
	}

	const blurImage = () => {
		if (toggleAction(BLUR)) return
		activeAction = trimString(BLUR)
		setBlur()
	}

	const setBlur = (value?: number) => {
		if (imageRef) {
			const bv = blurLevel / 20
			imageRef.style.filter = `blur(${bv}px)`
			if (value == 0) {
				imageRef.style.filter = 'blur(0px)'
			}
			isEditing = true
		}
	}
	const rotateLeft = () => {
		// if (toggleAction(ROTATE_LEFT)) return
		activeAction = trimString(ROTATE_LEFT)
		if (imageRef) {
			rotateValue -= 90
			imageRef.style.transform = `rotate(${rotateValue}deg)`
			isEditing = true
			if (Math.abs(rotateValue) == 360) rotateValue = 0
		}
	}

	const rotateRight = () => {
		// if (toggleAction(ROTATE_RIGHT)) return
		activeAction = trimString(ROTATE_RIGHT)
		if (imageRef) {
			rotateValue += 90
			imageRef.style.transform = `rotate(${rotateValue}deg)`
			if (Math.abs(rotateValue) == 360) rotateValue = 0
			isEditing = true
		}
	}

	const brushImage = () => {
		if (toggleAction(BRUSH)) return
		activeAction = trimString(BRUSH)
		if (imageRef) {
			isEditing = true
		}
	}

	const resetImage = () => {
		isEditing = false
		activeAction = ''
	}

	$: blurLevel ? setBlur() : setBlur(0)
</script>

<div class="mx-auto flex h-[75vh] w-full max-w-7xl flex-row gap-6 px-5 py-12">
	<div class="flex w-36 flex-col gap-6 rounded-xl bg-white py-5 shadow-lg">
		<ActionButton
			isActive={activeAction}
			text={ROTATE_90}
			icon={faRotateLeft}
			onClick={() => (rotate = !rotate)}
		/>
		{#if rotate}
			<ActionButton
				isActive={activeAction}
				text={ROTATE_LEFT}
				icon={faRotateLeft}
				onClick={() => rotateLeft()}
			/>
			<ActionButton
				isActive={activeAction}
				text={ROTATE_RIGHT}
				icon={faRotateRight}
				onClick={() => rotateRight()}
			/>
		{/if}
		<ActionButton
			isActive={activeAction}
			text={BRUSH}
			icon={faPaintBrush}
			onClick={() => brushImage()}
		/>
		<ActionButton
			isActive={activeAction}
			text={BLUR}
			icon={faDroplet}
			onClick={() => blurImage()}
		/>
		<ActionButton text={CROP} icon={faCropSimple} />
		<ActionButton text={TEXT} icon={faT} />
	</div>

	<div
		class="relative flex h-full max-h-[80vh] w-full justify-center
	{[90, 270].includes(Math.abs(rotateValue)) && 'top-20 h-[80%]'}"
	>
		<div class:hidden={!isEditing} class="absolute right-5 top-2 z-10 flex flex-row gap-2">
			<button
				on:click={() => resetImage()}
				class="flex items-center rounded-lg bg-white px-3 py-1 text-gray-700 hover:bg-gray-100 hover:text-black"
			>
				Reset
			</button>
			<button
				class="flex items-center rounded-lg bg-blue-400 px-3 py-1 text-white hover:bg-blue-300"
			>
				Apply
			</button>
		</div>

		<button
			class:hidden={activeAction}
			on:click={() => prevImage()}
			class="absolute left-5 top-[50%] flex h-10 w-10 items-center rounded-full p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
		>
			<Fa icon={faChevronLeft} size="1.6x" />
		</button>
		{#if $galleryStore.selectedImage}
			<img
				bind:this={imageRef}
				class="rounded-xl object-contain"
				src={$galleryStore.selectedImage.src?.toString()}
				alt={$galleryStore.selectedImage.name}
			/>
		{/if}

		<button
			class:hidden={activeAction}
			on:click={() => nextImage()}
			class="absolute right-5 top-[50%] flex h-10 w-10 items-center rounded-full p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
		>
			<Fa icon={faChevronRight} size="1.6x" />
		</button>
	</div>

	{#if showInfo}
		<ImageDetails />
	{/if}

	{#if activeAction == trimString(BLUR)}
		<BlurImagePanel bind:blurLevel />
	{/if}
</div>
