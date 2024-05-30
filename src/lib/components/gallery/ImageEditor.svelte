<script lang="ts">
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
	import { trimString } from '$lib/utils/tools'
	import BlurImagePanel from './BlurImagePanel.svelte'
	import ImageJs, { Image } from 'image-js'
	import type { ImageType } from '$lib/utils/types'
	import { createEventDispatcher, onDestroy } from 'svelte'

	const dispatch = createEventDispatcher()

	export let image: ImageType
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
	let isEditing = false
	let rotate = false
	let rotateValue = 0
	let imageObj: Image | null = null
	let editImageRef: ImageType | null

	const loadImage = async () => {
		if (image?.src) {
			// Load image with image-js for further other functionality
			imageObj = await ImageJs.load(image?.src)
		}
	}

	if (image?.src) {
		loadImage()
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
		if (imageRef && !isEditing) {
			isEditing = true
			editImageRef = image
		}
	}

	const resetImage = () => {
		isEditing = false
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
		isEditing = false
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (isEditing || activeAction) return
		switch (e.code) {
			case 'ArrowLeft':
				dispatch('previous')
				break
			case 'ArrowRight':
				dispatch('next')
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
		<div class:hidden={!isEditing} class="absolute right-5 top-2 z-10 flex flex-row gap-2">
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
			class="relative flex max-h-[80vh] w-full justify-center
		{[90, 270].includes(Math.abs(rotateValue)) && 'top-32 h-[75%]'}"
		>
			<button
				class:hidden={isEditing}
				on:click={() => dispatch('previous')}
				class="absolute left-5 top-[50%] z-10 flex h-10 w-10 items-center rounded-full border p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
			>
				<Fa icon={faChevronLeft} size="1.6x" />
			</button>
			{#if image}
				<img
					bind:this={imageRef}
					class="rounded-xl object-contain"
					src={isEditing ? editImageRef?.src?.toString() : image.src?.toString()}
					alt={image.name}
				/>
			{/if}

			<button
				class:hidden={isEditing}
				on:click={() => dispatch('next')}
				class="absolute right-5 top-[50%] flex h-10 w-10 items-center rounded-full border p-3 text-gray-400 hover:bg-gray-100 hover:bg-opacity-80 hover:text-black"
			>
				<Fa icon={faChevronRight} size="1.6x" />
			</button>
		</div>
	</div>

	{#if showInfo}
		<ImageDetails {image} />
	{/if}

	{#if activeAction == trimString(BLUR)}
		<BlurImagePanel bind:blurLevel />
	{/if}
</div>

<svelte:window on:keydown|preventDefault|stopPropagation={handleKeyDown} />
