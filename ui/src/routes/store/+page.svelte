<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton'
    import Store from './Store.svelte'
    import storedata from '$lib/stores.js'
    let stores = [];
    (async()=>{
        const url = `http://localhost:3011/store/key/tasks`
        const fetched = await fetch(url, { method: "GET" })
        const json = await fetched.json();
        stores = [...stores,{name:'tasks', publicKey:json.publicKey}]
    })();
    let newStoreName
    let selectedStore;
    storedata.subscribe(async (a)=>{
        if(a && a.length) {
            try {
                JSON.parse(a).forEach(async n=>{
                    const url = `http://localhost:3011/store/key/${n}`
                    console.log(n)
                    const fetched = await fetch(url, { method: "GET" })
                    const json = await fetched.json();
                    stores = [...stores,{name:n, publicKey:json.publicKey}]
                })
            } catch(e) {
                console.error(e)
            }
        }
    })
    const addNewStore =()=>{
        stores =  [...stores, {name:newStoreName}]
        storedata.set(JSON.stringify(stores))
        console.log(stores);
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
                <svelte:fragment slot="summary">{store.name} </svelte:fragment>
                <svelte:fragment slot="content"><Store name={store.name} publicKey={store.publicKey}></Store></svelte:fragment>
            </AccordionItem>
        {/each}
    </Accordion>

</div>