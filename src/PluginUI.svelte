<script>

	//import Global CSS from the svelte boilerplate
	//contains Figma color vars, spacing vars, utility classes and more
	import { GlobalCSS } from 'figma-plugin-ds-svelte';
	import { onMount } from 'svelte';
	import HelpIconButton from "./HelpIconButton.svelte"
    import lottie from 'lottie-web';
	import animationData from './heart.json';
	import { Button, Switch, Type, IconTidyUpListVertical, Label, IconFrame, Icon } from 'figma-plugin-ds-svelte';

	let container;
	let switchValue;
	let animation;
	


	onMount(() => {
		animation = lottie.loadAnimation({
			container: container,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			animationData
		});

		animation.addEventListener('DOMLoaded', () => {
			// Go to first frame and stop
			animation.goToAndStop(29, true);
		});
		animation.addEventListener('complete', () => {
			// When the animation ends, go back to the first frame and stop
			animation.goToAndStop(29, true);
		});

	});

	// Function to start the animation
	function startAnimation() {
		animation.play();
	}

	

	function breakLines() {
		animation.play();
		parent.postMessage({ pluginMessage: { 
			'type': 'break-lines',
			'frames': switchValue
		} }, '*');
	}

	function toggleSelected(){
		switchValue = !switchValue;
	}

	// Function to break text into lines and create separate text fields

  

	function cancel() {
		parent.postMessage({ pluginMessage: { 'type': 'cancel' } }, '*')
	}

</script>



<div class="wrapper p-xxsmall">

	<div class="flex p-xxxsmall mb-xsmall align-items-center">
		
		<button class="pill-button mr-xsmall " on:click={breakLines}>
			<div class="lottie-container heart mr-xxsmall" bind:this={container}></div>
			 Break It Up
		  </button>
		  <Type size="large" class=" mr-xxsmall">|</Type>
		<Icon iconName={IconFrame} on:click={toggleSelected} class=" mr-xxxsmall"></Icon>
		<Switch value="value" bind:checked={switchValue} class="icon-height mr-xxsmall"></Switch>
		<Type size="large" class=" mr-xsmall">|</Type>
		<HelpIconButton ></HelpIconButton> 
	</div>

</div>

<style>
	:global(.icon-height){
		height: 32px;
		width: 42px;
    	overflow: hidden;
	}
	.bg-color{
		background-color: var(--hud);
	}
	.lottie-container {
		width: 30px;
		height: 30px;
	}
	.pill-button {
		display: flex;
		font-size: 10px;
		padding: 10px 20px;
		background-color: #0A71CB;
		color: white;
		border-radius: 20px;
		border: none;
		text-decoration: none;
		transition: background-color 0.3s;

		text-align: center;
		align-items: center;
		padding-right: 25px;
		font-weight: bold;
    }

	.pill-button span{
		width: 20px;
	}

    .pill-button:hover {
      background-color: #0056b3;
    }

    .pill-button svg {
		height: 10px;
		width: 10px;
		vertical-align: middle;
		fill: white;
		margin-right: 5px;
    }

    .heart {
      fill: white;
      width: 20px;
      height: 20px;
    }
	.question-btn {
		border: none;
		background: none;
		cursor: pointer;
		}

		.question-btn svg {
		fill: #000; /* color of the icon */
		}

		.question-btn:hover svg {
		fill: #ff0000; /* color of the icon on hover */
		}

</style>
