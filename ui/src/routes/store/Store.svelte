<script>
    import { Table, tableMapperValues } from '@skeletonlabs/skeleton'
    let newKey, newValue
    export let name

    const sourceData = {}

    const mapper = Object.keys(sourceData).map(key=>{return{key, value:sourceData[key]}});
    const tableSimple = {
        head: ['Name', 'Value'],
        body: tableMapperValues(mapper, ['key', 'value']),
        meta: tableMapperValues(mapper, ['key', 'value']),
        foot: ['Total', `<code class="code">${sourceData.length}</code>`]
    }
    const saveValue = ()=>{
        
    }
</script>
<div>
    <input class="input max-w-md" placeholder="key" bind:value={newKey}/>
    <input class="input max-w-lg" placeholder="value" bind:value={newValue}/>
    <button
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 m-4"
        on:click={saveValue}>Save</button>
    <h1 class="text-lg">Store: {name}</h1>
    <Table source={tableSimple} />
</div>