<script>
    import { onMount } from "svelte";
    import Hosts from "./components/Hosts.svelte";
    import AddKey from "./components/AddKey.svelte";
    import rootKey from "../../seed.js"
    
    let keys = []
    try {
        keys = JSON.parse(localStorage.getItem());
    } catch(e) {

    }
    let selectedKey = null;


    async function addNewKey(newKeyName) {
        keys =  [...keys, newKeyName];
    }

    // Function to handle list item click
    function handleListItemClick(key) {
        selectedKey = key;
    }
</script>

<div class="flex">
    <!-- Left Section: List of Keys -->
    <div class="w-1/2 p-4">
        <h2 class="text-lg font-semibold mb-4">Keys</h2>
        <AddKey addKey={addNewKey} />
        <ul>
            {#each keys as key (key)}
                <li
                    class:active={selectedKey === key} 
                    on:click={() => handleListItemClick(key)} 
                >
                    {key}
                </li>
            {/each}
        </ul>
    </div>

    <div class="w-1/2 p-4">
        {#if selectedKey}
            {#key selectedKey}
            <Hosts rootKey={rootKey} keyName={selectedKey} /> <!-- Pass selectedKey to Host component -->
            {/key}
        {/if}
    </div>
</div>
