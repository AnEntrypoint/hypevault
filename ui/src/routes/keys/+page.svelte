<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'
    import Hosts from "./components/Hosts.svelte"
    import AddKey from "./components/AddKey.svelte"
    import rootKey from "../../lib/seed.js"
	import { json } from '@codemirror/lang-json';
    import keystore from '$lib/keys.js'
    let keys = []
    keystore.subscribe((a)=>{
        console.log(a)
        keys = JSON.parse(a)
    })
    let selectedKey=-1


    async function addNewKey(newKeyName) {
        keys =  [...keys, newKeyName]
        keystore.set(JSON.stringify(keys))
    }
</script>

<div class="flex">
    <!-- Left Section: List of Keys -->
    <div class="p-4  w-full">
        <h2 class="text-lg font-semibold mb-4">Keys</h2>
        <AddKey addKey={addNewKey} />
        <Accordion>
            {#each keys as key, index}
                <AccordionItem bind:group={selectedKey} name="{index}" value="{key}">
                    <svelte:fragment slot="lead">🗝️</svelte:fragment>
                    <svelte:fragment slot="summary">{key}</svelte:fragment>
                    <svelte:fragment slot="content"><Hosts rootKey={rootKey} keyName={key} /></svelte:fragment>
                </AccordionItem>
            {/each}
        </Accordion>
    </div>
</div>
