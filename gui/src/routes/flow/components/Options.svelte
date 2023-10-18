<script>
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import keystore from '$lib/keys.js';
	import selectedKeyStore from '$lib/selectedKey.js';

	let keys = [];
	export let selectedKey;
	keystore.subscribe((a) => {
		keys = JSON.parse(a);
	});
	selectedKeyStore.subscribe((a) => {
		selectedKey = a;
		console.log('selected key', a);
	});
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Options</Button>
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Options</Sheet.Title>
			<Sheet.Description>Select your options</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Select.Root bind:selected={selectedKey}>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder={selectedKey || 'Network'} />
					</Select.Trigger>
					<Select.Content>
						{#each keys as key, i}
							<Select.Item
								on:click={() => {
									selectedKey = key.name;
									selectedKeyStore.set(key.name);
								}}
								value={key.name}
							>
								{key.name}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="submit">Save changes</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
