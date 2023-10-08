<script>
    import b4a from "b4a"
    let hosts = []
    let selectedHost
    let nodes = []
    let nodename
    export let keyName = ""
    export let rootKey
    
    async function findHosts() {
        // Make a call to Vault to assign the string as a name
        const subFetch = await fetch(`http://localhost:3011/vault/getSub/${keyName}`, {
            method: "POST",
            body: JSON.stringify({ key:rootKey }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const sub = await subFetch.json();
        console.log(sub);
        console.log(sub.publicKey)

        const response = await fetch(`http://localhost:3011/vault/findHosts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ key:sub }),
        });

        const data = await response.json();
        console.log(data)
        hosts = data
    }
    
    const getNodes =  async (host) => {
        const subFetch = await fetch(`http://localhost:3011/vault/getNodes`, {
            method: "POST",
            body: JSON.stringify({hostKey:{publicKey:host}}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return await subFetch.json()
    }
    const selectHost = async (selected)=>{
        console.log(selected, hosts[selected]);
        selectedHost = selected
        nodes = []
        nodes = (await getNodes(hosts[selectedHost])).nodes
        console.log(nodes)
    }
    const startNode = async ()=>{

        const subFetch = await fetch(`http://localhost:3011/vault/getSub/${keyName}`, {
            method: "POST",
            body: JSON.stringify({ key:rootKey }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const sub = await subFetch.json();
        console.log(sub)
        const nodeFetch = await fetch(`http://localhost:3011/vault/startNode/`+nodename, {
            method: "POST",
            body: JSON.stringify({hostKey:{publicKey:hosts[selectedHost]}, sub}),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return nodeFetch
    }
    findHosts()
</script>

<div>
    <h2 class="text-lg font-semibold mb-4">Hosts: {keyName}</h2>

    {#each hosts as host, i}
        <div on:click={()=>{selectHost(i)}}>{host}</div>
    {/each}
    {#if hosts[selectedHost]}
        <div>Selected: {hosts[selectedHost]}</div>

        <div>Nodes running on this host</div>
        Start node: 
        <input
        type="text"
        bind:value={nodename}
        class="w-full border rounded-md p-2 mb-2"
        placeholder="Enter a node name"
    />
    <button
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        on:click={startNode}>Start Node on host</button>

        {#each nodes as node, i}
            <div>{node.name}</div>
        {/each}
    {/if}
    
</div>
