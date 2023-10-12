<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import Host from './Host.svelte';
	let hosts = [];
	let selectedHost;

	export let keyName = '';
	export let rootKey;

	async function findHosts() {
		// Make a call to Vault to assign the string as a name
		const subFetch = await fetch(`http://localhost:3011/vault/getSub/${keyName}`, {
			method: 'POST',
			body: JSON.stringify({ key: rootKey }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const sub = await subFetch.json();
		console.log(sub);
		console.log(sub.publicKey);

		const response = await fetch(`http://localhost:3011/vault/findHosts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ key: sub })
		});

		const data = await response.json();
		console.log(data);
		hosts = data;
	}

	findHosts();
</script>

<div>
	<h2 class="text-lg font-semibold mb-4">Hosts:</h2>
	{#if !hosts.length}
		<div class="grid grid-cols-3 gap-8 mb-2">
			<div class="placeholder" />
			<div class="placeholder" />
			<div class="placeholder" />
		</div>
		<div class="grid grid-cols-3 gap-8">
			<div class="placeholder" />
			<div class="placeholder" />
			<div class="placeholder" />
		</div>
	{/if}
	<Accordion.Root class="variant-filled-surface rounded-lg">
		{#each hosts as host, index}
			<Accordion.Item value={host}>
				<Accordion.Trigger>🖥️{host}</Accordion.Trigger>
				<Accordion.Content>
					<Host {host} {keyName} {rootKey} />
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</div>
