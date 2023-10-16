<script>
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	let newName;
	export let selectedKey;
	export let pk;
	export let calls;
	const add = async () => {
		console.log(selectedKey.value);
		const newcalls = [...calls];
		const key = await (
			await fetch(`http://localhost:3011/vault/getSub/${selectedKey.value}`, {
				method: 'POST',
				body: JSON.stringify({ key: { publicKey: pk } }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
		const sub = await (
			await fetch(`http://localhost:3011/vault/getSub/call-${newName}`, {
				method: 'POST',
				body: JSON.stringify({ key }),
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
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
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Create</Button>
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Create</Sheet.Title>
			<Sheet.Description>Create a new flow graph</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="username" class="text-right">Node</Label>
				<Input id="username" class="col-span-3" bind:value={newName} />
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="submit" on:click={add}>Add</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
