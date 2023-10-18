<script>
	export let addKey;
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	let newKeyName = '';

	function addNewKey() {
		if (newKeyName) {
			addKey(newKeyName);
			newKeyName = '';
		}
	}
</script>

<div class="flex">
	<Input type="text" bind:value={newKeyName} class="max-w-sm" placeholder="Enter a key name" />
	<Button on:click={addNewKey}>Add Key</Button>
</div>
