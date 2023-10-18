<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Host from './Host.svelte';
	import * as Card from '$lib/components/ui/card';
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
					<Card.Root>
						<Card.Header>
							<Accordion.Trigger><Card.Title>Remote host: {index}</Card.Title></Accordion.Trigger>

							<Card.Description>{host}</Card.Description>
						</Card.Header>
						<Card.Content>
							<Accordion.Content>
								<Host {host} {keyName} {rootKey} />
							</Accordion.Content>
						</Card.Content>
					</Card.Root>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
		{#if !hosts.length}
			No hosts found
		{/if}
	{/if}
</div>
