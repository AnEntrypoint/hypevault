<script>
	import keys from '$lib/keys.js';
	import stores from '$lib/stores.js';
	import { rootKey, set } from '$lib/seed.js';
	import * as Card from '$lib/components/ui/card';
	import { copy } from '$lib/clickToCopy.js';
	import { Input } from '$lib/components/ui/input';
	let restorePaste;
	const getConfig = () => {
		const config = { keys, stores, rootKey };
		return JSON.stringify(config);
	};
	const save = (input) => {
		const data = JSON.parse(input);
		keys.set(data.keys);
		stores.set(data.stores);
		set(data.rootKey);
		restorePaste = '';
	};

	function convertToHex(str) {
		var hex = '';
		for (var i = 0; i < str.length; i++) {
			hex += '' + str.charCodeAt(i).toString(16);
		}
		return hex;
	}

	function convertFromHex(hex) {
		var hex = hex.toString(); //force conversion
		var str = '';
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	}
</script>

<section class="py-4 lg:px-12 md:px-8">
	<Card.Root>
		<Card.Header>
			<Card.Title>Configuration</Card.Title>
		</Card.Header>
		<Card.Content>
			<Card.Root class="m-4">
				<Card.Header>
					<Card.Title>Backup</Card.Title>
					<Card.Description>Back up to clipboard</Card.Description>
				</Card.Header>
				<Card.Content>
					<button
						on:click={() => {
							copy(convertToHex(getConfig()));
						}}
					>
						Click to copy
					</button>
				</Card.Content>
			</Card.Root>
			<Card.Root class="m-4">
				<Card.Header>
					<Card.Title>Restore</Card.Title>
					<Card.Description
						><Input
							class="input mt-2"
							placeholder="paste here"
							bind:value={restorePaste}
						/></Card.Description
					>
				</Card.Header>
				<Card.Content>
					<button
						on:click={() => {
							save(convertFromHex(restorePaste));
						}}
					>
						Click to save
					</button>
				</Card.Content>
			</Card.Root>
		</Card.Content>
	</Card.Root>
</section>
