<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Host from './Host.svelte';
	let hosts = [];

	export let keyName = '';
	export let rootKey;

	async function findHosts() {
		// Make a call to Vault to assign the string as a name
		const sub = await (
			await fetch(`http://localhost:3011/vault/getSub/${keyName}`, {
				method: 'POST',
				body: JSON.stringify({ key: rootKey }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
		console.log(sub);
		console.log(sub.publicKey);

		const data = await (
			await fetch(`http://localhost:3011/vault/findHosts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ key: sub })
			})
		).json();
		hosts = data;
	}

	findHosts();
</script>

<div>
	<h2 class="text-lg font-semibold mb-4">Hosts:</h2>
	{#if !hosts.length}
		<div class="flex items-center space-x-4 m-4">
			<Skeleton class="h-4 w-4 rounded-full" />
			<Skeleton class="h-4 w-[250px]" />
		</div>
		<div class="flex items-center space-x-4 m-4">
			<Skeleton class="h-4 w-4 rounded-full" />
			<Skeleton class="h-4 w-[250px]" />
		</div>
	{/if}
	<Accordion.Root class="variant-filled-surface rounded-lg">
		{#each hosts as host, index}
			<Accordion.Item value={host}>
				<Accordion.Trigger>{host}</Accordion.Trigger>
				<Accordion.Content>
					<Host {host} {keyName} {rootKey} />
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</div>
