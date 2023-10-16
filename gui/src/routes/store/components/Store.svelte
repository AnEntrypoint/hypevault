<script>
	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { rootKey } from '../../../lib/seed.js';
	import Call from '../../flow/components/Call.svelte';
	import { Svelvet, ThemeToggle } from 'svelvet';
	import { isJSON, isTask } from './utils.js'; // Import utility functions
	import { BASE_URL } from '../../../config.js'; // Import base URL from config file
	let pk = rootKey.publicKey;
	let newKey, newValue;
	export let name;
	export let publicKey;

	let sourceData = {};
	(async () => {
		const json = await (
			await fetch(`${BASE_URL}/store/loadAll/${name}`, { method: 'GET' }) // Use base URL from config file
		).json();
		sourceData = { ...json.values };
	})();
	// Function to delete a value from the source data
	const deleteValue = (selectedKey) => {
		const output = { ...sourceData };
		delete output[selectedKey];
		sourceData = output;
	};
	// Function to save a new value to the source data
	const saveValue = () => {
		const output = { ...sourceData };
		output[newKey] = newValue;
		sourceData = output;
	};
</script>

<div class="m-4">
	<h1 class="text-lg">Replication env:</h1>
	
		publicKey <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{publicKey}</code>
	
	<div class="flex items-center space-x-4 m-4">
		<Input class="input max-w-xs" placeholder="key" bind:value={newKey} />
		<Input class="input max-w-sm" placeholder="value" bind:value={newValue} />
		<Button on:click={saveValue}>Save</Button>
	</div>
	<h1 class="text-lg">Store: {name}</h1>
	<Table.Root>
		<Table.Caption>Environment Variables.</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head >Key</Table.Head>
				<Table.Head>Value</Table.Head>
				<Table.Head>Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each Object.keys(sourceData) as key, i (i)}
				<Table.Row>
					<Table.Cell class="font-medium">{key}</Table.Cell>
					<Table.Cell class="w-full">
						{#if isJSON(sourceData[key])}
							{#if isTask(JSON.parse(sourceData[key]))}
								<Svelvet initialZoom={0.3}>
									{#each JSON.parse(sourceData[key]) as { name, before, after, output, stdout, stderr, result, sub }, index}
										<Call
											id={'call-' + index}
											{name}
											{before}
											{after}
											output={output.map((a) => 'call-' + a)}
											{sub}
											{pk}
											x={null}
											y={null}
											stdout={null}
											stderr={null}
											result={null}
											remove={() => {}}
										/>
									{/each}
									<ThemeToggle main="dark" alt="light" slot="toggle" />
								</Svelvet>
							{/if}
							{#if !isTask(JSON.parse(sourceData[key]))}
								<pre>{JSON.stringify(JSON.parse(sourceData[key]), null, 2)}</pre>
							{/if}
						{/if}
					</Table.Cell>
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
