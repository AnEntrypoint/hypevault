<script>
	import * as Table from '$lib/components/ui/table';
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
	const deleteValue = () => {};
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
	<Table.Root>
		<Table.Caption>Environment Variables.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Key</Table.Head>
				<Table.Head>Value</Table.Head>
				<Table.Head class="text-right">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each Object.keys(sourceData) as key, i (i)}
				<Table.Row>
					<Table.Cell class="font-medium">{key}</Table.Cell>
					<Table.Cell>{sourceData[key]}</Table.Cell>
					<Table.Cell class="text-right">
						<button
							class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-600 m-2"
							on:click={deleteValue}>Delete</button
						>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
