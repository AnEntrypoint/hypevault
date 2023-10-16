<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Host from './Host.svelte';
	let hosts;

	export let keyName = '';
	export let rootKey;
	let sub;

	(async () => {
		sub = await (
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
		async function findHosts() {
			console.log({ rootKey });
			// Make a call to Vault to assign the string as a name

			const data = await (
				await fetch(`http://localhost:3011/vault/findHosts`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ key: sub })
				})
			).json();
			console.log(data);
			hosts = data;
		}
		findHosts();
	})();
</script>

<div>
	<h2 class="text-lg font-semibold mb-4">Hosts:</h2>
	Start a host:
	{#if sub && sub.publicKey}
		<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
			npx hypehost {sub.publicKey}
		</code>
	{/if}

	{#if !hosts}
		<div class="flex items-center space-x-4 m-4">
			<Skeleton class="h-4 w-4 rounded-full" />
			<Skeleton class="h-4 w-[250px]" />
		</div>
		<div class="flex items-center space-x-4 m-4">
			<Skeleton class="h-4 w-4 rounded-full" />
			<Skeleton class="h-4 w-[250px]" />
		</div>
	{/if}
	{#if hosts && hosts.length}
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
		{#if !hosts.length}
			No hosts found
		{/if}
	{/if}
</div>
