<script>
    import b4a from "b4a"
    let hosts = [];


    export let keyName = ""
    export let rootKey

    async function findHosts() {
        // Make a call to Vault to assign the string as a name
        const subFetch = await fetch(`http://localhost:3011/vault/getSub/${keyName}`, {
            method: "POST",
            body: JSON.stringify({ rootKey }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const sub = await subFetch.json();

        function buf2hex(buffer) { // buffer is an ArrayBuffer
            return [...new Uint8Array(buffer)]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('');
        } 
        console.log(sub.publicKey)
        console.log(b4a.toBuffer(buf2hex(sub.publicKey.data), 'binary'))

        const response = await fetch(`http://localhost:3011/vault/findNodes/${keyName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: keyName, key:sub }),
        });

        //const response = await fetch(`vault/findNodes/${keyName}`);
        const data = await response.json();
        console.log(data)
        hosts = data;
        //callNames = data;
    }
    
    findHosts()
</script>

<div>
    <h2 class="text-lg font-semibold mb-4">Hosts: {keyName}</h2>

    {#each hosts as host}
        <div>{host}</div>
    {/each}
</div>
