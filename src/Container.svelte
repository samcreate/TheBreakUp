<script>
  import { onDestroy } from 'svelte';
  import Footer from './components/Footer';
  import TopRow from "./components/TopRow";
  import { toggleStore } from './store.js';

  let toggleValue;
  let lineCount = 0;
  const unsubscribe = toggleStore.subscribe(value => {
    toggleValue = value;
  });

  window.onmessage = function(event) {
    try {
      if (event.data.pluginMessage.type === 'lineUpdate') {
      lineCount = event.data.pluginMessage.data.lineCount;
    }
    } catch (error) {
      
    }
    
  }

  // Remember to unsubscribe when the component is destroyed
  onDestroy(unsubscribe);
</script>

<div class="container">
  <!-- <div>{toggleValue ? 'On' : 'Off'}</div> -->
  <TopRow count={lineCount} />
  <Footer />
</div>

<style>
  .container {
    position: relative;
    background-color: var(--color-black);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2px;
  }

</style>