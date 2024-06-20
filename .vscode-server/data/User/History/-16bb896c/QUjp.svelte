<script lang="ts">
  import Button from '../components/Button.svelte';
  import Bind from'../components/Bind.svelte';
  import Fetchdata from'../hooks/Fetchdata.svelte';
  import { selectedItem } from '../hooks/store';
  <script lang="ts">
  import { selectedItem } from './store';
  import { get } from 'svelte/store';

  let item = get(selectedItem);

  selectedItem.subscribe(value => {
    item = value;
  });
</script>

<main>
  {#if item}
    <h1>{item.title}</h1>
    <p>{item.description}</p>
    <img src={item.thumbnail} alt={item.title} />
  {:else}
    <p>No item selected.</p>
  {/if}
</main>

<style>
  img {
    max-width: 100%;
  }
</style>

  import ItemList from '../components/ItemList.svelte';
  import ItemDetail from '../components/ItemDetails.svelte';

  let item = get(selectedItem);

  selectedItem.subscribe(value => {
    item = value;
  });
</script>

<main>
  <Button />
  <Bind />
  <div class="products-list">
  <Fetchdata />
  </div>
  
    <ItemDetail />
    <ItemList />
</main>

<style>
.products-list{
}
  main {
    padding: 16px;
  }
</style>
