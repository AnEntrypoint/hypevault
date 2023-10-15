<script>
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	let newKey, newValue;
	let nodes = [];
	let nodename;
	export let keyName = '';
	export let rootKey;
	export let host;

	let sourceData = {};

	const saveValue = () => {
		const output = { ...sourceData };
		output[newKey] = newValue;
		sourceData = output;
		console.log(sourceData);
	};
	const deleteValue = (selectedKey) => {
		console.log('test');
		const output = { ...sourceData };
		delete output[selectedKey];
		sourceData = output;
		console.log(sourceData);
	};
	const getNodes = async (host) => {
		const nodesFetch = await (
			await fetch(`http://localhost:3011/vault/getNodes`, {
				method: 'POST',
				body: JSON.stringify({ hostKey: { publicKey: host } }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
		return nodesFetch;
	};
	(async () => {
		nodes = (await getNodes(host)).nodes;
	})();
	const startNode = async () => {
		const keyFetch = await (
			await fetch(`http://localhost:3011/vault/getSub/${keyName}`, {
				method: 'POST',
				body: JSON.stringify({ key: rootKey }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
		const key = keyFetch;

		const sub = await (
			await fetch(`http://localhost:3011/vault/getSub/call-${keyName}`, {
				method: 'POST',
				body: JSON.stringify({ key }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
		console.log({ sourceData });
		const nodeFetch = await (
			await fetch(`http://localhost:3011/vault/startNode/` + nodename, {
				method: 'POST',
				body: JSON.stringify({ hostKey: { publicKey: host }, sub, env: sourceData }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
		return nodeFetch;
	};
</script>

<div class="variant-filled-surface rounded-b-lg p-4">
	<Input class="input max-w-sm" placeholder="env" bind:value={newKey} />
	<Input class="input max-w-sm" placeholder="value" bind:value={newValue} />
	<Button on:click={saveValue}>Save</Button>
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
							on:click={() => {
								deleteValue(key);
							}}>Delete</button
						>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<Input
		type="text"
		bind:value={nodename}
		class="input max-w-xl m-4"
		placeholder="Enter a node name"
	/>
	<Button on:click={startNode}>Start Node on host</Button>
	{#if nodes.length}
		<h1 class="max-w-xl text-lg m-4">Running:</h1>
		{#each nodes as node, i}
			<div class="varian-ghost-surface">
				<button type="button" class="btn variant-filled m-4">
					{node.name}
					<button type="button" class="btn-icon variant-filled-surface ml-2">X</button>
				</button>
			</div>
		{/each}
	{/if}
</div>
