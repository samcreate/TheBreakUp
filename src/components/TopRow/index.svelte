<script>
  import { toggleStore } from '../../store.js';
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
  import frameIcon from './frame-icon.svg';

  export let count = 0; // this is the prop received from the parent component

  const anim_count = tweened(count, {
		duration: 600,
		easing: cubicOut
	});


  $:if (count || count === 0){
    anim_count.set(count)
  }


  let isToggled = false;
  let countElement;
  let animation;
  let mounted = false;

 

  function toggle() {
    isToggled = !isToggled;
    toggleStore.update(value => isToggled);
  }
</script>

  <div class="top-row">
    <div class="count">
      <div class="label" bind:this={countElement}>{Math.round($anim_count)}</div>
    </div>
    <div class="framelines-toggle">
      <div class="label1">{@html frameIcon}</div>
      <div class="toggle" on:click={toggle}>
        <div class="background" class:toggled={isToggled}></div>
        <div class="switch" class:toggled={isToggled}></div>
      </div>
    </div>
  </div>

  <style>
    .label {
    position: relative;
    line-height: 99%;
    justify-content: center;
    width: 59px;
    font-variant-numeric: tabular-nums;
  }
  .count,
  .label,
  .label1 {
    display: flex;
    align-items: center;
  }
  .count {
    flex: 1;
    border-radius: var(--br-21xl);
    background-color: var(--color-orange);
    flex-direction: column;
    padding: var(--padding-4xl) var(--padding-9xs);
    justify-content: center;
  }
  .label1 {
    position: relative;
    width: 76px;
    flex-shrink: 0;
    justify-content: center;
  }
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: var(--br-42xl);
    border: 1px solid var(--color-white);
    box-sizing: border-box;
    background-color: none;
    transition: all 0.5s ease;
  }

  .background.toggled {
    
    background-color: var(--color-orange);
    border: 1px solid var(--color-orange);
  }
  .switch {
    position: absolute;
    height: 88.41%;
    width: 40.94%;
    top: 5.8%;
    right: 56.38%;
    bottom: 5.8%;
    left: 2.68%;
    border-radius: 50%;
    background-color: var(--color-white);
    transition: all 0.3s ease;
    transform: translateX(0px);
    
    opacity: 0.35;
  }
  .switch.toggled{
    background-color: var(--color-white);
    transform: translateX(81px);
    opacity: 1;
  }
 
  .toggle {
    position: relative;
    width: 149px;
    height: 69px;
    cursor:pointer;
  }

  .toggle:hover .switch{
    opacity: 1;
  }
  .framelines-toggle,
  .top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: var(--gap-8xs);
    text-align: left;
    font-size: var(--font-size-2xl);
    color: var(--color-darkgray);
  }
  .top-row {
    align-self: stretch;
    align-items: flex-start;
    gap: var(--gap-3xs);
    text-align: center;
    font-size: var(--font-size-3xl);
    color: var(--color-black);
    font-family: var(--font-inter);
  }
  
  </style>