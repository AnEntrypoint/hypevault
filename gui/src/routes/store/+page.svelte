<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import Store from './components/Store.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import storedata from '$lib/stores.js';
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
	<h1 class="text-2xl m-4">Stores</h1>
	<div class="flex items-center space-x-4 m-4">
		<Input class="input" bind:value={newStoreName} />
		<Button on:click={addNewStore}>Create Store</Button>
	</div>
	<Accordion.Root>
		{#each stores as store, index}
			<Accordion.Item bind:group={selectedStore} name={index} value={store.name}>
				<Accordion.Trigger>{store.name}</Accordion.Trigger>
				<Accordion.Content>
					<Store name={store.name} publicKey={store.publicKey} />
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</section>
