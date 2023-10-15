<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import Store from './Store.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import storedata from '$lib/stores.js';
	let stores = [];
	(async () => {
		const json = await (
			await fetch(`http://localhost:3011/store/key/tasks`, { method: 'GET' })
		).json();
		stores = [...stores, { name: 'tasks', publicKey: json.publicKey }];
	})();
	let newStoreName;
	let selectedStore;
	storedata.subscribe(async (a) => {
		if (a && a.length) {
			try {
				JSON.parse(a).forEach(async (n) => {
					const json = await (
						await fetch(`http://localhost:3011/store/key/${n}`, { method: 'GET' })
					).json();
					stores = [...stores, { name: n, publicKey: json.publicKey }];
				});
			} catch (e) {
				console.error(e);
			}
		}
	});
	const addNewStore = () => {
		stores = [...stores, { name: newStoreName }];
		storedata.set(JSON.stringify(stores));
		console.log(stores);
	};
</script>

<div class="p-4">
	<h1 class="text-2xl m-4">Stores</h1>
	<Input class="input" bind:value={newStoreName} />
	<Button on:click={addNewStore}>Create Store</Button>
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
</div>
