<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'
    import Store from './Store.svelte'
    import storedata from '$lib/stores.js'
    let stores = ['tasks']
    let newStoreName;
    let selectedStore;
    storedata.subscribe((a)=>{
        stores = [...stores,JSON.parse(a)]
    })
    const addNewStore =()=>{
        stores =  [...stores, newStoreName]
        storedata.set(JSON.stringify(stores))
    }
</script>

<div class="p-4">
    <h1 class="text-2xl m-4">Stores</h1>
    <input class="input" bind:value={newStoreName}>
    <button
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 m-4"
        on:click={addNewStore}>Create Store</button>
    <Accordion>
        {#each stores as store, index}
            <AccordionItem bind:group={selectedStore} name="{index}" value="{store}">
                <svelte:fragment slot="lead">🗝️</svelte:fragment>
                <svelte:fragment slot="summary">{store}</svelte:fragment>
                <svelte:fragment slot="content"><Store name={store}></Store></svelte:fragment>
            </AccordionItem>
        {/each}
    </Accordion>

</div>