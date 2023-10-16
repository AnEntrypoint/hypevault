<script>
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import storedata from '$lib/stores.js';
	let stores = [];
	let selectedStore;
	storedata.subscribe(async (a) => {
		if (a && a.length) {
			try {
				JSON.parse(a).forEach(async (n) => {
					console.log({ n });
					stores = [...stores, n];
				});
			} catch (e) {
				console.error(e);
			}
		}
	});
	let taskName;
	export let calls;

	const load = async () => {
		console.log('load');
		const url = `http://localhost:3011/store/load/task/${taskName}`;
		const fetched = await fetch(url, { method: 'GET' });
		const json = await fetched.json();
		console.log({ json });
	};
	const save = async () => {
		const sanitized = [...calls];
		sanitized.forEach((a) => {
			delete a.result;
			delete a.stdout;
			delete a.stderr;
		});
		const url = `http://localhost:3011/store/save/task/${taskName}`;
		const fetched = await (
			await fetch(url, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(calls)
			})
		).json();
		console.log(fetched);
	};
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Storage</Button>
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Save</Sheet.Title>
			<Sheet.Description>Save your flow to a store</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input
					name="name"
					class="col-span-3"
					placeholder="Task name"
					bind:value={taskName}
					style="width:10em"
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="store" class="text-right">Store</Label>
				<Select.Root>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder="Select a store" />
					</Select.Trigger>
					<Select.Content bind:value={selectedStore}>
						{#each stores as store, index}
							<Select.Item value={store.name}>{store.name}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} on:click={load}>Load</Button>
				<Button builders={[builder]} on:click={save}>Save changes</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
