<script>
    export let addKey;

    let newKeyName = "";

    function addNewKey() {
        if (newKeyName) {
            addKey(newKeyName); // Call the addKey action with the new key name
            newKeyName = ""; // Reset the input field after adding the key
        }
    }
</script>

<div>
    <input
        type="text"
        bind:value={newKeyName}
        class="w-full border rounded-md p-2 mb-2"
        placeholder="Enter a key name"
    />
    <button
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        on:click={addNewKey}>Add Key</button>
</div>
