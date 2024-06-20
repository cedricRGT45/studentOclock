<script lang="ts">
  import { selectedItem, isModalOpen } from '../hooks/store';
  import { get } from 'svelte/store';

  let item = get(selectedItem);

  selectedItem.subscribe(value => {
    item = value;
  });

  function closeModal() {
    isModalOpen.set(false);
  }
</script>

{#if item}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <h1 class="modal-title">{item.title}</h1>
      <p class="modal-description"> {item.description}</p>
      <img class="modal=img" src={item.thumbnail} alt={item.title} />
      <button class="modal-close" on:click={closeModal}>Close</button>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width:80%;
    height:20%;
    background: rgba(0, 0, 0, 0.5);
   margin: auto;
  }
  .modal-content {
    display:grid;
     grid-template-columns: repeat(3, 1fr);
     grid-template-rows: repeat(3, 1fr);
    background: #007bff;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 90%;
    height:30rem;
  }

  .modal-title{
    grid-column:1/4;
    grid-row:1/2;
  }
  .modal-img{
    grid-column:1/3;
    grid-row:2/4;
  }

  .modal-description{
    grid-column:2/4;
    grid-row:2/3;
  }

  .modal-close{
    grid-column:3/4;
    grid-row:3/4;
    width:10rem;
    height:5rem;
    background-color:white; 
    color: #007bff;
  }

   .modal-close:hover{
    background-color:#007bff; 
    color: white;
    border:1px solid white;
    animation: scaleup 100ms ease-in;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
   }
  img {
    max-width: 100%;
  }
  button {
    margin-top: 1rem;
  }

  @keyframes scaleup{
    25%{
      transform: scale(1.05);
    }
    45%{
      transform: scale(1.1);
    }
    75%{
      transform: scale(1.15)
    }
    100%{
      transform: scale(1.2);
    }
  }
</style>
