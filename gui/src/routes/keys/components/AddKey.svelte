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

<div>
    <div class="flex items-center space-x-4 m-4">
	<Input type="text" bind:value={newKeyName} class="max-w-sm" placeholder="Enter a key name" />
	<Button on:click={addNewKey}>Add Key</Button>
    </div>
</div>
