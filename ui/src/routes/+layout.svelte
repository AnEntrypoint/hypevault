<script>
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Header from '../components/Header.svelte';
	import SidebarLeft from '../components/SidebarLeft.svelte';
	let currentTile;
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppShell>
			<svelte:fragment slot="header">
				<Header />
			</svelte:fragment>
			<svelte:fragment slot="sidebarLeft">
				<SidebarLeft />
			</svelte:fragment>
			<slot style="margin-top:50px" />
		</AppShell>
</svelte:fragment>
	<slot style="margin-top:50px" />
</AppShell>
