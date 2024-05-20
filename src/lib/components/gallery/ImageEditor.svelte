<script lang="ts">
	import { galleryStore } from '$lib/store'
	import {
		faChevronLeft,
		faChevronRight,
		faCropSimple,
		faDroplet,
		faPaintBrush,
		faRotate,
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
	import type { ImageType } from '$lib/utils/types'
	import { onDestroy } from 'svelte'

	export let showInfo = false

	const ROTATE_90 = 'Rotate 90°'
	const ROTATE_RIGHT = '90° Right'
	const ROTATE_LEFT = '90° Left'
	const BLUR = 'Blur'
	const BRUSH = 'Brush'
	const CROP = 'Crop'
	const TEXT = 'Text'

	let activeAction: string = ''
	let imageRef: HTMLImageElement | null = null
	let blurLevel = 0

	let rotate = false
	let rotateValue = 0
	let imageObj: Image | null = null
	let editImageRef: ImageType | null

	$: idx = $galleryStore.images.map((item: any) => item.id).indexOf($galleryStore.selectedImage?.id)

	const loadImage = async () => {
		if ($galleryStore.selectedImage?.src) {
			// Load image with image-js for further other functionality
			imageObj = await ImageJs.load($galleryStore.selectedImage?.src)
		}
	}

	if ($galleryStore.selectedImage?.src) {
		loadImage()
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
		enableEditing()
		setBlur()
	}

	const setBlur = (value?: number) => {
		if (imageRef) {
			const bv = blurLevel / 20
			imageRef.style.filter = `blur(${bv}px)`
			if (value == 0) {
				imageRef.style.filter = 'blur(0px)'
			}
		}
	}
	const rotateLeft = () => {
		activeAction = trimString(ROTATE_LEFT)
		if (imageRef) {
			enableEditing()
			rotateValue -= 90
			imageRef.style.transform = `rotate(${rotateValue}deg)`
			if (Math.abs(rotateValue) == 360) rotateValue = 0
		}
	}

	const rotateRight = () => {
		activeAction = trimString(ROTATE_RIGHT)
		if (imageRef) {
			enableEditing()
			rotateValue += 90
			imageRef.style.transform = `rotate(${rotateValue}deg)`
			if (Math.abs(rotateValue) == 360) rotateValue = 0
		}
	}

	const brushImage = () => {
		if (toggleAction(BRUSH)) return
		activeAction = trimString(BRUSH)
		enableEditing()
	}

	const enableEditing = () => {
		if (imageRef && !$galleryStore.isEditing) {
			$galleryStore.isEditing = true
			editImageRef = $galleryStore.selectedImage
		}
	}

	const resetImage = () => {
		$galleryStore.isEditing = false
		activeAction = ''
		editImageRef = null
		if (imageRef) {
			rotateValue = 0
			imageRef.style.filter = `blur(${0}px)`
			imageRef.style.transform = `rotate(0deg)`
		}
	}

	const toggleRotate = () => {
		rotate = !rotate
		if (rotate) activeAction = trimString(ROTATE_90)
		else activeAction = ''
	}

	$: blurLevel ? setBlur() : setBlur(0)
	// To handle active rotate state and remove active state on click other operation
	$: rotate &&
	![trimString(ROTATE_LEFT), trimString(ROTATE_90), trimString(ROTATE_RIGHT)].includes(activeAction)
		? (rotate = false)
		: ''

	onDestroy(() => {
		resetImage()
	})

	const applyChanges = () => {
		// TODO: implement apply image chanages
		rotate = false
		activeAction = ''
		$galleryStore.isEditing = false
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if ($galleryStore.isEditing || activeAction) return
		switch (e.code) {
			case 'ArrowLeft':
				prevImage()
				break
			case 'ArrowRight':
				nextImage()
				break
			default:
				break
		}
	}
</script>

<div class="mx-auto flex h-[75vh] w-full max-w-7xl flex-row gap-6 px-5 py-12">
	<div class="flex w-36 flex-col gap-6 truncate rounded-xl bg-white py-5 shadow-lg">
		<ActionButton
			isActive={rotate ? trimString(ROTATE_90) : ''}
			text={ROTATE_90}
			icon={faRotate}
			onClick={() => toggleRotate()}
		/>
		{#if rotate}
			<ActionButton
				borderDown
				isActive={activeAction}
				text={ROTATE_RIGHT}
				icon={faRotateRight}
				onClick={() => rotateRight()}
			/>
			<ActionButton
				borderDown
				isActive={activeAction}
				text={ROTATE_LEFT}
				icon={faRotateLeft}
				onClick={() => rotateLeft()}
			/>
		{/if}
		<ActionButton isActive={activeAction} text={BRUSH} icon={faPaintBrush} />
		<ActionButton
			isActive={activeAction}
			text={BLUR}
			icon={faDroplet}
			onClick={() => blurImage()}
		/>
		<ActionButton text={CROP} icon={faCropSimple} />
		<ActionButton text={TEXT} icon={faT} />
	</div>

	<div class="relative flex w-full flex-col">
		<div
			class:hidden={!$galleryStore.isEditing}
			class="absolute right-5 top-2 z-10 flex flex-row gap-2"
		>
			<button
				on:click={() => resetImage()}
				class="flex items-center rounded-lg border bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
			>
				Reset
			</button>
			<button
				on:click={() => applyChanges()}
				class="flex items-center rounded-lg bg-blue-400 px-3 py-1 text-sm text-white hover:bg-blue-300"
			>
				Apply
			</button>
		</div>

		<div
			class="relative flex h-full max-h-[80vh] w-full justify-center
		{[90, 270].includes(Math.abs(rotateValue)) && 'top-32 h-[75%]'}"
		>
			<button
				class:hidden={$galleryStore.isEditing}
				on:click={() => prevImage()}
				class="absolute left-5 top-[50%] z-10 flex h-10 w-10 items-center rounded-full border p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
			>
				<Fa icon={faChevronLeft} size="1.6x" />
			</button>
			{#if $galleryStore.selectedImage}
				<img
					bind:this={imageRef}
					class="rounded-xl object-contain"
					src={$galleryStore.isEditing
						? editImageRef?.src?.toString()
						: $galleryStore.selectedImage.src?.toString()}
					alt={$galleryStore.selectedImage.name}
				/>
			{/if}

			<button
				class:hidden={$galleryStore.isEditing}
				on:click={() => nextImage()}
				class="absolute right-5 top-[50%] flex h-10 w-10 items-center rounded-full border p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
			>
				<Fa icon={faChevronRight} size="1.6x" />
			</button>
		</div>
	</div>

	{#if showInfo}
		<ImageDetails />
	{/if}

	{#if activeAction == trimString(BLUR)}
		<BlurImagePanel bind:blurLevel />
	{/if}
</div>

<svelte:window on:keydown|preventDefault|stopPropagation={handleKeyDown} />
