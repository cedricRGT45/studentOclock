<script lang="ts">
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
      console.log(products); // Affiche les données dans la console pour vérifier
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchData();
  });
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
      </div>

      {/each}
  {/if}

<style>
.products{
  display:flex;
  flex-direction:row;
  border: .1rem solid #007bff;
  border-radius:1rem;
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
