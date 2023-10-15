<script>
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	let newKey, newValue;
	export let name;
	export let publicKey;

	let sourceData = {};
	(async () => {
		const json = await (
			await fetch(`http://localhost:3011/store/loadAll/${name}`, { method: 'GET' })
		).json();
		sourceData = { ...json.values };
	})();
	const deleteValue = (selectedKey) => {
		console.log('test');
		const output = { ...sourceData };
		delete output[selectedKey];
		sourceData = output;
		console.log(sourceData);
	};
	const saveValue = () => {
		const output = { ...sourceData };
		output[newKey] = newValue;
		sourceData = output;
		console.log(sourceData);
	};
</script>

<div>
	<h1 class="text-lg">Replication key:</h1>
	<div>{publicKey}</div>
	<div class="flex items-center space-x-4 m-4">
		<Input class="input max-w-md" placeholder="key" bind:value={newKey} />
		<Input class="input max-w-lg" placeholder="value" bind:value={newValue} />
	</div>
	<Button on:click={saveValue}>Save</Button>
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
						<Button
							on:click={() => {
								deleteValue(key);
							}}>Delete</Button
						>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
