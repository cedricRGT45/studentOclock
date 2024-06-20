<script lang="ts">
    let inputValue = "";
    let inputBind = "Ce champ est vide";

    // Fonction pour vérifier la valeur de l'input
    const handleInput = () => {
        inputBind = inputValue ? "Ce champ est complet" : "Ce champ est vide";
    };
</script>

<form>
    <p>{inputBind}</p>
    <input type="text" bind:value={inputValue} on:input={handleInput}>
</form>

<style>
    p {black
        color: ;
    }
    input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 10px;
    }
</style>
