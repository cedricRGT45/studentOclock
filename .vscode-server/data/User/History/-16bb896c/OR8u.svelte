<script lang="ts">
  import Button from '../components/Button.svelte';
  import Bind from'../components/Bind.svelte';
  import fetchdata from'../hooks/fetchdata.svelte';
</script>

<main>
  <Button />
  <Bind />
  <fetchdata />
</main>

<style>
  main {
    padding: 16px;
  }
</style>
