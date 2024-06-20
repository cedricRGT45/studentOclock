<script lang="ts">
  import Button from '../components/Button.svelte';
  import Bind from'../components/Bind.svelte';
  import Fetchdata from'../hooks/Fetchdata.svelte';
</script>

<main>
  <Button />
  <Bind />
  <div class="products-list">
  <Fetchdata />
  </div>
</main>

<style>
.products-list{
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
  main {
    padding: 16px;
  }
</style>
