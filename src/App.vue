<template>
	<router-view> </router-view>
</template>

<script setup lang="ts"></script>

<style>
	:root {
		--bg-color: #1c404c;
		--Light-Text: #fff;
		--Light-Text-2: #f4d9ae;
		--CTA: #cd4f41;
		--CTA-2: #de9e46;
		--lines: rgba(45, 128, 120, 0.5);
		--Game-Board-BG: rgba(45, 128, 120, 0.2);
	}

	.bg-ttt {
		background: var(--bg-color);
	}

	.ttt-button {
		display: flex;
		width: 20rem;
		padding: 1.125rem 1.5rem;
		justify-content: center;
		align-items: center;
		gap: 0.625rem;
		border-radius: 0.375rem;
		/* Text */
		font-family: "Noto Sans";
		font-size: 1.5rem;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		cursor: pointer;
		text-transform: uppercase;
	}
	.ttt-button.rounded-none {
		border-radius: 0px;
	}

	.btn-1 {
		background: var(--CTA);
		color: var(--Light-Text);
	}
	.btn-2 {
		background: var(--CTA-2);
		color: var(--Light-Text);
	}
	.btn-3 {
		color: var(--Light-Text);
	}

	.t-orange {
		color: var(--CTA-2);
	}

	.ttt-h1 {
		color: var(--Light-Text);
		font-family: "Noto Sans";
		font-size: 2.375rem;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}

	.ttt-subtext {
		color: var(--Light-Text-2);
		font-family: Gilroy-Light;
		font-size: 1.5rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.ttt-icon {
		width: 2.5rem;
		height: 5.5rem;
	}
</style>
