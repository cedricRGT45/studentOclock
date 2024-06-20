<script lang="ts">
  import { selectedItem } from './store';
  import { onMount } from 'svelte';
  
  let products = [];
  let loading = true;
  let error = null;

  async function fetchData() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      products = data.products;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchData();
  });

  function selectItem(item) {
    selectedItem.set(item);
  }
</script>

<main>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <ul>
      {#each products as product}
        <li on:click={() => selectItem(product)}>{product.title}</li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 8px 0;
    cursor: pointer;
  }
</style>
