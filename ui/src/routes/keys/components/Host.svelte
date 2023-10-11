<script>
    let nodes = []
    let nodename
    export let keyName = ""
    export let rootKey
    export let host
    
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
        console.log(sub, host)
        const nodeFetch = await fetch(`http://localhost:3011/vault/startNode/`+nodename, {
            method: "POST",
            body: JSON.stringify({hostKey:{publicKey:host}, sub}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return nodeFetch
    }
</script>

<div class="variant-filled-surface rounded-b-lg p-4">
    <h1 class="m-4 text-lg ">Start node: </h1>
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
        <button  type="button" class="btn variant-filled m-4">
            {node.name}
            <button type="button" class="btn-icon variant-filled-surface ml-2">X</button>
        </button>
    {/each}
    {/if}


</div>
