<script lang="ts">
  let active = true;
</script>

{#if active}
  <h1>Ceci est un titre</h1>
{/if}
<button on:click|preventDefault={() => {
  active = !active;
}}>Menu</button>

<style>
  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  h1 {
    color: #007bff;
  }
</style>
