<script>
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';

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
		console.log({ host });
		const nodesFetch = await (
			await fetch(`/vault/getNodes`, {
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
			await fetch(`/vault/getSub/${keyName}`, {
				method: 'POST',
				body: JSON.stringify({ key: rootKey }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
		const key = keyFetch;

		console.log({ sourceData });
		const nodeFetch = await (
			await fetch(`/vault/startNode/` + nodename, {
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

<Card.Root class="m-4">
	<Card.Header>
		<Card.Title>Environment Variables.</Card.Title>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Caption>Add new:</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-48"
						><Input class="input max-w-xs m-2" placeholder="env" bind:value={newKey} /></Table.Head
					>
					<Table.Head
						><Input
							class="input max-w-sm m-2"
							placeholder="value"
							bind:value={newValue}
						/></Table.Head
					>
					<Table.Head>
						<Button on:click={saveValue}>Save</Button>
					</Table.Head>
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
		<div class="flex">
			<Input
				type="text"
				bind:value={nodename}
				class="input max-w-md mx-4"
				placeholder="Enter a node name"
			/>
			<Button on:click={startNode}>Start Node on host</Button>
		</div>
	</Card.Content>
</Card.Root>
<Card.Root class="m-4">
	<Card.Header>
		<Card.Title>Nodes</Card.Title>
	</Card.Header>
	<Card.Content>
		<div class="flex">
			{#if nodes}
				{#each nodes as node, i}
					<Card.Root class="m-4">
						<Card.Header>
							<Card.Title>{node.name}</Card.Title>
							{#if node.env.length}
								<Card.Description
									>Env:<br /><code
										class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
									/>
									{Object.keys(node.env)
										.map((key) => 'key: ' + node.env[key])
										.join('\n')}
								</Card.Description>
							{/if}
						</Card.Header>
						<Card.Content>
							<div>
								<Button class="mx-4">Remove</Button>
							</div>
						</Card.Content>
					</Card.Root>
				{/each}
			{/if}
		</div>
	</Card.Content>
</Card.Root>
