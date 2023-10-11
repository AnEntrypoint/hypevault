<script>
    import { Table, tableMapperValues } from '@skeletonlabs/skeleton'
    let newKey, newValue
    export let name
    export let publicKey

    let sourceData = {};
    const refreshTable = ()=>{
        const mapper = Object.keys(sourceData).map(key=>{return{key, value:sourceData[key]}});
        return {
            head: ['Name', 'Value'],
            body: tableMapperValues(mapper, ['key', 'value']),
            meta: tableMapperValues(mapper, ['key', 'value']),
            foot: ['Total', `${Object.keys(sourceData).length}`]
        }
    }
    let tableSimple = refreshTable();
    (async()=>{
        const url = `http://localhost:3011/store/loadAll/${name}`
        const fetched = await fetch(url, { method: "GET" })
        const json = await fetched.json();
        sourceData = {...json.values}
        tableSimple = refreshTable()
    })()

    const saveValue = ()=>{
        
    }
</script>
<div>
    <h1 class="text-lg">Replication key: </h1><div>{publicKey}</div>
    <input class="input max-w-md" placeholder="key" bind:value={newKey}/>
    <input class="input max-w-lg" placeholder="value" bind:value={newValue}/>
    <button
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 m-4"
        on:click={saveValue}>Save</button>
    <h1 class="text-lg">Store: {name}</h1>
    <Table source={tableSimple} />
</div>