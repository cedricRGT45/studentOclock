<script>
    let inputBind = "Ce champ est vide";
</script>

<form>
<p>
</p>
<input type="text" bind:value={inputBind}>
</form>
{ inputBind }

<style>
p{
    color:white;
}
</style>