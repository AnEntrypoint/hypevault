<script>
	import { Svelvet, ThemeToggle } from 'svelvet';
	import { Input } from '$lib/components/ui/input';
	import Call from './Call.svelte';
	import { runCall } from 'hypeeval';
	import rootKey from '../../lib/seed.js';
	let pk = rootKey.publicKey;
	let calls = [];
	let newName;
	let taskName;
	const add = async () => {
		const newcalls = [...calls];
		const keyFetch = await fetch(`http://localhost:3011/vault/getSub/${newName}`, {
			method: 'POST',
			body: JSON.stringify({ key: { publicKey: pk } }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const key = await keyFetch.json();
		const subFetch = await fetch(`http://localhost:3011/vault/getSub/call-${newName}`, {
			method: 'POST',
			body: JSON.stringify({ key }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const sub = await subFetch.json();
		console.log({ sub });
		newcalls.push({
			name: newName,
			before: "console.log('before:', params);",
			after: "console.log('after', out);",
			output: [],
			sub: { publicKey: sub.publicKey }
		});
		console.log(newcalls);
		calls = newcalls;
	};
	const refresh = (incalls) => {
		const newcalls = [...incalls];
		calls = newcalls;
	};
	function remove(index) {
		if (index >= 0 && index < calls.length) {
			calls = [...calls.slice(0, index), ...calls.slice(index + 1)];
		}
	}

	const run = (calls) => {
		const ipcCall = async (pk, name, params) => {
			const subFetch = await fetch(`http://localhost:3011/vault/getSub/${name}`, {
				method: 'POST',
				body: JSON.stringify({ key: { publicKey: pk } }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log('fetched');
			const sub = await subFetch.json();
			const url = `http://localhost:3011/run/key/${sub.publicKey}`;
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
		const url = `http://localhost:3011/task/run/${pk}/${name}`;

		const fetched = await fetch(url, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({})
		});
		const output = await fetched.json();
		console.log({ output });
		calls = output;
	};

	const save = async (incalls, taskName) => {
		const url = `http://localhost:3011/store/save/task/${taskName}`;
		const fetched = await fetch(url, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(incalls)
		});
		console.log(calls);
	};
	const load = async (taskName) => {
		const url = `http://localhost:3011/store/load/task/${taskName}`;
		const fetched = await fetch(url, { method: 'GET' });
		const json = await fetched.json();
		console.log({ json });
		refresh(json);
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

<div>
	<section class="flex">
		<button
			on:click|stopPropagation={() => {
				run(calls);
			}}
			class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">TEST</button
		>
		<Input placeholder="Task name" bind:value={taskName} style="max-width:10em" class="input" />
		<button
			on:click|stopPropagation={() => {
				save(calls, taskName);
			}}
			class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">SAVE</button
		>
		<button
			on:click|stopPropagation={() => {
				runOnServer(taskName);
			}}
			class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
		>
			RUN
		</button>
		<button
			on:click|stopPropagation={() => {
				load(taskName);
			}}
			class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
		>
			LOAD
		</button>
		<button
			class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
			on:click|stopPropagation={add}>+</button
		>
		<Input
			placeholder="new ipc call name"
			bind:value={newName}
			style="max-width:10em"
			class="input"
		/>
	</section>
</div>
<Svelvet minimap controls on:connection={handleConnection}>
	{#each calls as { name, before, after, output, stdout, stderr, result, sub }, index}
		<Call
			id={'call-' + index}
			bind:name
			bind:before
			bind:after
			output={output.map((a) => 'call-' + a)}
			{stdout}
			{stderr}
			{result}
			{sub}
			{remove}
			{pk}
			x={index * 1200}
			y={250}
		/>
	{/each}
	<ThemeToggle main="dark" alt="light" slot="toggle" />
</Svelvet>

<style>
</style>
