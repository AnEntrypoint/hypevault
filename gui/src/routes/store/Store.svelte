<script>
	let newKey, newValue;
	export let name;
	export let publicKey;

	let sourceData = {};
	(async () => {
		const url = `http://localhost:3011/store/loadAll/${name}`;
		const fetched = await fetch(url, { method: 'GET' });
		const json = await fetched.json();
		sourceData = { ...json.values };
	})();

	const saveValue = () => {};
</script>

<div>
	<h1 class="text-lg">Replication key:</h1>
	<div>{publicKey}</div>
	<input class="input max-w-md" placeholder="key" bind:value={newKey} />
	<input class="input max-w-lg" placeholder="value" bind:value={newValue} />
	<button
		class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 m-4"
		on:click={saveValue}>Save</button
	>
	<h1 class="text-lg">Store: {name}</h1>
	<pre>
        {JSON.stringify(sourceData, null, 2)}
    </pre>
</div>
