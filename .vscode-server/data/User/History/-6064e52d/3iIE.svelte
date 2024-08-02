<script lang="ts">
  import { onMount } from 'svelte';
  import { selectedItem, isModalOpen } from '../hooks/store';

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

  function selectItem(item) {
    selectedItem.set(item);
    isModalOpen.set(true);
  }

  onMount(() => {
    fetchData();
  });
</script>

<main>
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    {#each products as product}
      <div class="product">
        <div class="product-price">
          <p>{product.price}$</p>
        </div>
        <div class="product-content">
          <h2>{product.title}</h2>
          <p class="product-description">{product.description}</p>
        </div>
        <button on:click={() => selectItem(product)}>Plus de détail</button>
      </div>
    {/each}
  {/if}
</main>

<style>
  .product {
    display: flex;
    flex-direction: row;
    border: 0.1rem solid #007bff;
    border-radius: 1rem;
    box-shadow: 1px 1px 10px 1px #007bff;
    margin: 1rem;
  }
  .product-price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
  }
  .product-price p {
    font-size: 3rem;
    padding: 0.5rem;
  }

  button {
    color: black;
    background: white;
  }
  p {
    color: black;
  }
</style>
