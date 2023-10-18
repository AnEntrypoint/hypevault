<script>
	import { Svelvet, ThemeToggle } from 'svelvet';
	import Options from './components/Options.svelte';
	import Storage from './components/Storage.svelte';
	import Create from './components/Create.svelte';
	import Call from './components/Call.svelte';
	import { runCall } from 'hypeeval';
	import { rootKey } from '../../lib/seed.js';
	let selectedKey;

	let pk = rootKey.publicKey;
	let calls = [];
	const refresh = () => {
		const newcalls = [...calls];
		calls = newcalls;
	};
	function remove(index) {
		if (index >= 0 && index < calls.length) {
			calls = [...calls.slice(0, index), ...calls.slice(index + 1)];
		}
	}

	const run = (calls) => {
		const ipcCall = async (pk, name, params) => {
			const subFetch = await fetch(`/vault/getSub/${name}`, {
				method: 'POST',
				body: JSON.stringify({ key: { publicKey: pk } }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log('fetched');
			const sub = await subFetch.json();
			const url = `/run/key/${sub.publicKey}`;
			console.log({ url });
			const fetched = await fetch(url, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(params)
			});
			return await fetched.json();
		};

		runCall(0, calls, {}, pk, ipcCall, () => refresh(calls));
	};
	const runOnServer = async (name) => {
		const url = `/task/run/${pk}/${name}`;

		const fetched = await fetch(url, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({})
		});
		const output = await fetched.json();
		console.log({ output });
		calls = output;
	};

	function handleConnection(event) {
		const outsplit = event.detail.targetNode.id.split('-');
		console.log({ outsplit });
		const outname = parseInt(outsplit[2]);
		const insplit = event.detail.sourceNode.id.split('-');
		console.log({ insplit });
		const inname = parseInt(insplit[2]);
		const innode = calls[inname];
		const outnode = calls[outname];
		console.log(outname, inname);
		if (innode && outnode && !innode.output.includes(outsplit[2]))
			innode.output.push(parseInt(outsplit[2]));
	}
</script>

<section class="h-full pb-28">
	<section class="flex pb-2 px-4">
		<Options bind:selectedKey />
		<Storage bind:calls />
		<Create bind:calls {pk} {selectedKey} />
	</section>
	<Svelvet minimap controls on:connection={handleConnection}>
		{#each calls as { name, before, after, output, stdout, stderr, result, sub, x, y }, index}
			<Call
				id={'call-' + index}
				bind:name
				bind:before
				bind:after
				output={output.map((a) => 'call-' + a)}
				{selectedKey}
				{stdout}
				{stderr}
				{result}
				{sub}
				{remove}
				{pk}
				bind:x
				bind:y
			/>
		{/each}
		<ThemeToggle main="dark" alt="light" slot="toggle" />
	</Svelvet>
</section>
