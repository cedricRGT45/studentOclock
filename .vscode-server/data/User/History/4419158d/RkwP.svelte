{#if active}
 <h1>Ceci est un titre</h1>
{/if}
 <button on:click|preventDefault={() => {
  active = !active;
 }}>Menu</button>