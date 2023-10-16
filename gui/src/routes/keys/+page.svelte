<script>
	import * as Accordion from '$lib/components/ui/accordion';
	import Hosts from './components/Hosts.svelte';
	import AddKey from './components/AddKey.svelte';
	import { rootKey } from '../../lib/seed.js';
	import keystore from '$lib/keys.js';
	let keys = [];
	keystore.subscribe((a) => {
		console.log(a);
		keys = JSON.parse(a);
	});
	let selectedKey = -1;

	async function addNewKey(newKeyName) {
		keys = [...keys, newKeyName];
		keystore.set(JSON.stringify(keys));
	}
</script>

<section class="py-4 lg:px-12 md:px-8">
	<h2 class="text-lg font-semibold mb-4">Networks</h2>
	<AddKey addKey={addNewKey} />
	<Accordion.Root>
		{#each keys as key, index}
			<Accordion.Item bind:group={selectedKey} name={index} value={key}>
				<Accordion.Trigger>🗝️{key}</Accordion.Trigger>
				<Accordion.Content>
					<Hosts {rootKey} keyName={key} />
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</section>
