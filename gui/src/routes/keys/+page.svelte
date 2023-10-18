<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import Hosts from './components/Hosts.svelte';
	import AddKey from './components/AddKey.svelte';
	import { rootKey } from '../../lib/seed.js';
	import keystore from '$lib/keys.js';
	import * as Card from '$lib/components/ui/card';
	let keys = [];
	keystore.subscribe((a) => {
		console.log(a);
		keys = JSON.parse(a);
	});
	let selectedKey = -1;

	async function addNewKey(newKeyName) {
		const sub = await (
			await fetch(`http://localhost:3011/vault/getSub/${newKeyName}`, {
				method: 'POST',
				body: JSON.stringify({ key: rootKey }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
		keys = [...keys, { name: newKeyName, sub }];
		keystore.set(JSON.stringify(keys));
	}
</script>

<section class="py-4 lg:px-12 md:px-8">
	<Card.Root>
		<Card.Header>
			<Card.Title>Networks</Card.Title>
			<Card.Description><div class="pb-2">Add network:</div><AddKey addKey={addNewKey} /></Card.Description>
		</Card.Header>
		<Card.Content>
			<Accordion.Root>
				{#each keys as key, index}
					<Accordion.Item bind:group={selectedKey} name={index} value={key.name}>
						<Card.Root>
							<Card.Header>
								<Accordion.Trigger class="pt-0"
									><Card.Title>{key.name}</Card.Title></Accordion.Trigger
								>
								<Card.Description
									>{#if key}
										<code
											class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
										>
											npx hypehost {key.sub.publicKey}
										</code>
									{/if}</Card.Description
								>
							</Card.Header>
							<Accordion.Content>
								<Card.Content>
									<Hosts {rootKey} keyName={key} />
								</Card.Content>
							</Accordion.Content>
						</Card.Root>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</Card.Content>
	</Card.Root>
</section>
