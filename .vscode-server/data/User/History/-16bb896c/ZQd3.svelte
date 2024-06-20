<script lang="ts">
  import Button from '../components/Button.svelte';
  import Bind from '../components/Bind.svelte';
  import Fetchdata from '../hooks/Fetchdata.svelte';
  import ItemDetail from '../components/ItemDetail.svelte';
  import { isModalOpen } from '../hooks/store';
  import { get } from 'svelte/store';

  let modalOpen = get(isModalOpen);

  isModalOpen.subscribe(value => {
    modalOpen = value;
  });
</script>

<main>
  <Button />
  <Bind />
  <div class="products-list">
    <Fetchdata />
  </div>
  {#if modalOpen}
    <ItemDetail />
  {/if}
</main>

<style>
  .products-list {
  }
  main {
    padding: 16px;
  }
</style>
