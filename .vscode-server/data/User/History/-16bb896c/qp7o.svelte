<script lang="ts">
  import Button from '../components/Button.svelte';
  import Bind from'../components/Bind.svelte';
  import Fetchdata from'../hooks/Fetchdata.svelte';
</script>

<main>
  <Button />
  <Bind />
  <Fetchdata />
</main>

<style>
  main {
    padding: 16px;
  }
</style>
