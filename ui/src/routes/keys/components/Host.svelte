<script>

    import { Table, tableMapperValues } from '@skeletonlabs/skeleton'
    let newKey, newValue
    let nodes = []
    let nodename
    let selectedKey 
    export let keyName = ""
    export let rootKey
    export let host

    let sourceData = {}
    const handleSelectedKey = (inp) => {
        selectedKey=inp.detail[0]
    }
    const refreshTable = ()=>{
        const mapper = Object.keys(sourceData).map(key=>{
                return {key, value:sourceData[key]}
            })
            console.log(mapper)
        let tableSimple = {
            head: ['Environment Var', 'Value'],
            body: tableMapperValues(mapper, ['key', 'value']),
            meta: tableMapperValues(mapper, ['key', 'value']),
            foot: ['Total', `${sourceData.length||'0'}`]
        }
        return tableSimple;
    }
    let tableSimple = refreshTable();
    const saveValue = ()=>{
        const output = {...sourceData}
        output[newKey] = newValue
        sourceData = output
        console.log(sourceData)
        tableSimple = refreshTable()
    }
    const deleteValue = ()=>{
        console.log('test')
        const output = {...sourceData}
        delete output[selectedKey]
        sourceData = output
        console.log(sourceData)
        tableSimple = refreshTable()
    }
    const getNodes =  async (host) => {
        const nodesFetch = await fetch(`http://localhost:3011/vault/getNodes`, {
            method: "POST",
            body: JSON.stringify({hostKey:{publicKey:host}}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await nodesFetch.json()
    }
    (async()=>{
        nodes = (await getNodes(host)).nodes
    })()
    const startNode = async ()=>{

        const keyFetch = await fetch(`http://localhost:3011/vault/getSub/${keyName}`, {
            method: "POST",
            body: JSON.stringify({ key:rootKey }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const key = await keyFetch.json();

        const subFetch = await fetch(`http://localhost:3011/vault/getSub/call-${keyName}`, {
            method: "POST",
            body: JSON.stringify({ key }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const sub = await subFetch.json();
        console.log({sourceData})
        const nodeFetch = await fetch(`http://localhost:3011/vault/startNode/`+nodename, {
            method: "POST",
            body: JSON.stringify({hostKey:{publicKey:host}, sub, env:sourceData}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return nodeFetch
    }
</script>

<div class="variant-filled-surface rounded-b-lg p-4">
    <input class="input max-w-sm" placeholder="env" bind:value={newKey}/>
    <input class="input max-w-sm" placeholder="value" bind:value={newValue}/>
    <button
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 m-2"
        on:click={saveValue}>Save</button>
    {#key sourceData}
    {#if Object.keys(sourceData).length}
    <button
        class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-600 m-2"
        on:click={deleteValue}>Delete</button>
    {/if}
    {/key}
    <Table source={tableSimple} interactive={true} on:selected={handleSelectedKey}/>
    <input
    type="text"
    bind:value={nodename}
    class="input max-w-xl m-4"
    placeholder="Enter a node name"
    />
    <button class="bg-green-500 text-white px-4 py-2 m-4 rounded-md hover:bg-green-600" on:click={startNode}>Start Node on host</button>
    {#if nodes.length}
    <h1 class="max-w-xl text-lg m-4">Running:</h1>
    {#each nodes as node, i}
        <div class="varian-ghost-surface">
            <button  type="button" class="btn variant-filled m-4">
                {node.name}
                <button type="button" class="btn-icon variant-filled-surface ml-2">X</button>
            </button>
        </div>
    {/each}
    {/if}


</div>
