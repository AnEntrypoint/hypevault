<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import Store from './components/Store.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import storedata from '$lib/stores.js';
	import * as Card from '$lib/components/ui/card';
	let stores = [];
	let newStoreName;
	let selectedStore;
	storedata.subscribe(async (a) => {
		if (a && a.length) {
			try {
				stores = JSON.parse(a);
			} catch (e) {
				console.error(e);
			}
		}
	});
	const addNewStore = async () => {
		const { publicKey } = await (
			await fetch(`http://localhost:3011/store/key/${newStoreName}`)
		).json();
		const newStores = [...stores, { name: newStoreName, publicKey }];
		storedata.set(JSON.stringify(newStores));
		console.log(stores);
	};
</script>

<section class="py-4 lg:px-12 md:px-8">
	<Card.Root>
		<Card.Header>
			<Card.Title>Stores</Card.Title>
			<Card.Description
				><div class="pb-2">Add store:</div>
				<div class="flex max-w-lg space-x-4">
					<Input class="input" bind:value={newStoreName} />
					<Button on:click={addNewStore}>Create Store</Button>
				</div></Card.Description
			>
		</Card.Header>
		<Card.Content
			><Accordion.Root>
				{#each stores as store, index}
					<Accordion.Item bind:group={selectedStore} name={index} value={store.name}>
						<Card.Root>
							<Card.Header>
								<Accordion.Trigger class="pt-0"
									><Card.Title>{store.name}</Card.Title></Accordion.Trigger
								>
								<Card.Description
									><code
										class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
										>publicKey {store.publicKey}</code
									></Card.Description
								>
							</Card.Header>

							<Accordion.Content>
								<Card.Content>
									<Store name={store.name} publicKey={store.publicKey} />
								</Card.Content>
							</Accordion.Content>
						</Card.Root>
					</Accordion.Item>
				{/each}
			</Accordion.Root></Card.Content
		>
	</Card.Root>
</section>
