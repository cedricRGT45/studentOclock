<script lang="ts">
  import { onMount } from 'svelte';
  let products = [];

  onMount(() => {
    fetchData();
  });

   import { selectedItem } from '../hooks/store';
  import { onMount } from 'svelte';
  
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

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
      {#each products as product}
        <div class="products">
        <div class="product-price">
          <p>{product.price}$</p>
        </div>
        <div class="product-content">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </div>
          <button on:click={() => selectItem(product)}>Plus de détail</button>
      </div>

      {/each}
  {/if}

<style>
.products{
  display:flex;
  flex-direction:row;
  border: .1rem solid #007bff;
  border-radius:1rem;
  box-shadow: 1px 1px 10px 1px #007bff;
  margin:1rem;
}
.product-price{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
  width: 25%;
}
.product-price{
  font-size:3rem;
  padding:.5rem;
}


button{
  color:black;
  background:white;
}
  p {
    color: black;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 8px 0;
  }
</style>
