<script lang="ts">
  import Button from '../components/Button.svelte';
  import Bind from'../components/Bind.svelte';
  import Fetchdata from'../hooks/Fetchdata.svelte';
  import { selectedItem } from '../hooks/store';
  import { get } from 'svelte/store';
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
</main>

<style>
.products-list{
}
  main {
    padding: 16px;
  }
</style>
