<script lang="ts">
  let active = true;
</script>

<main>
{#if active}
 <h1>Ceci est un titre</h1>
{/if}
 <button on:click | preventDefault={() => {
  active = !active;
 }}>Menu</button>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
