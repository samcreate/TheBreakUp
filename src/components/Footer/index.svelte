<script>
    import { toggleStore } from '../../store.js';
    import { fade } from 'svelte/transition';
    import linesSvg from './group-2.svg';
    import closeSvg from './close.svg';

    let breakButton;
    let showHelp = false;
    let delayAmount = 0;

    function breakLines() {
        parent.parent.postMessage({ pluginMessage: { 
			'type': 'break-lines',
			'frames': $toggleStore
		} }, '*');
       
    }

    function helpInfoToggle() {
        
        showHelp = !showHelp;
       

    }

    function test(params) {
        console.log("here")
    }

</script>

<div class="bottom-row">
  {#if !showHelp}
    <button on:click={breakLines} class="button" bind:this={breakButton}  delay={ (showHelp ? 0 : 110) } showHelp={showHelp}>
        <div class="group-parent">
            <div class="frame-child">{@html linesSvg}</div>
        <div class="break-it">Break It</div>
        </div>
    </button>
  {/if}
  {#if !showHelp}
  <button class="help init" on:click={helpInfoToggle}  delay={ (!showHelp ? 0 : 500) } showHelp={showHelp}>
    <div class="labelbutton">
      <div class="label2">?</div>
    </div>
  </button>
  {:else}
  <button class="help"  delay={ (showHelp ? 110 : 0) } showHelp={showHelp}>
    <div class="link">
      <!-- <div class="aaronmcguiredesign" on:click={()=>{window.location.href = "https://www.aaronmcguire.design"}}>aaronmcguire.design</div> -->
      <a class="aaronmcguiredesign"  href="https://www.aaronmcguire.design" target="_blank">aaronmcguire.design</a>
    </div>
    <div class="labelbutton">
        <div class="close-icon"  on:click={helpInfoToggle} >{@html closeSvg}</div>
    </div>
  </button>
  {/if}
</div>

<style>
.frame-child {
    position: relative;
    width: 48px;
    height: 30px;
  }
  .break-it {
    position: relative;
    font-size: var(--font-size-3xl);
    line-height: 99%;
    font-weight: 500;
    font-family: var(--font-inter);
    color: var(--color-black);
    text-align: center;
    transition: all 0.2s ease;
  }
  .button,
  .group-parent {
    display: flex;
    align-items: center;
    
  }
  .group-parent {
    width: fit-content;
    flex-direction: row;
    justify-content: flex-start;
    gap: var(--gap-16xl);
  }
  .button {
    cursor: pointer;
    border: 1px solid var(--color-white);
    padding: var(--padding-lgi) var(--padding-9xs);
    background-color: var(--color-gray);
    border-radius: var(--br-21xl);
    box-sizing: border-box;
    width: 259px;
    flex-direction: column;
    justify-content: center;
    transition: all 0.2s ease;
    
  }
  .button:hover {
    background-color: var(--color-black) !important;
  }
  .button:hover .break-it{
    color: var(--color-white);
  }
  .button:hover .frame-child *{
    fill: var(--color-white);
  }
  :global(.button > div > div.frame-child > svg > line){
    transition: all 0.2s ease;
  }
  :global(.button:hover > div > div.frame-child > svg > line){
    stroke: white;
  }
  .aaronmcguiredesign {
    position: relative;
    font-size: var(--font-size-base);
    line-height: 99%;
    text-transform: uppercase;
    font-weight: 200;
    font-family: var(--font-inter);
    color: var(--color-white);
    text-align: center;
    text-decoration: none;
    cursor: pointer !important;
    transition: all 0.2s ease;
  }
  .aaronmcguiredesign:hover {
    color: var( --color-orange);
  }
  .label2,
  .link {
    align-items: center;
  }
  .link {
    border-bottom: 1px solid var(--color-white);
    flex-direction: row;
    padding: 0 0 var(--padding-8xs);
    justify-content: flex-start;
  }
  .label2 {
    position: absolute;
    top: -6px;
    left: -14px;
    font-size: var(--font-size-13xl);
    line-height: 99%;
    font-weight: 200;
    font-family: var(--font-inter);
    color: var(--color-white);
    text-align: center;
    display: flex;
    justify-content: center;
    width: 59px;
    cursor: pointer;
  }
  .close-icon {
    position: absolute;
    width: 17px;
    height: 16px;
    cursor: pointer !important;
    transition: all 0.2s ease;
  }
  :global(.close-icon:hover > svg > path) {
    stroke: var( --color-orange);
  }
  .labelbutton {
    position: relative;
    width: 34px;
    height: 18px;
    display: flex;
    justify-content: center;
  }
  .bottom-row,
  .help {
    display: flex;
    flex-direction: row;
    
  }
  .help {
    cursor: pointer;
    border: 1px solid var(--color-white);
    padding: var(--padding-4xl) var(--padding-base) var(--padding-4xl)
      var(--padding-3xl);
    background-color: transparent;
    flex: 1;
    border-radius: var(--br-21xl);
    box-sizing: border-box;
    height: 68px;
    align-items: center;
    justify-content: center;
    gap: var(--gap-mini);
    transition: all 0.2s ease;
  }
  .help.init:hover {
    opacity: 0.5;
  }
  .bottom-row {
    align-self: stretch;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--gap-10xs);
  }
  </style>
