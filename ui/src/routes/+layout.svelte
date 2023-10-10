<script>
    // Importing the application's postcss file for styling
	import '../app.postcss';
    // Importing components from Skeleton UI library
	import { AppShell, AppBar, AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	let currentTile;
	// Importing modules from Floating UI library for creating and managing popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    // Importing the popup store from Skeleton UI library to manage popup state
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href='/'><div class="w-full h-full"><strong class="text-xl uppercase">Hype</strong></div></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="/host"
					rel="noreferrer"
				>
					Hosts
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/anentrypoint/hypeflow"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>

	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
	<AppRail>
	    <!-- Constants for AppRailTile values and groups -->
	    const VAULT_VALUE = 0;
	    const FLOW_VALUE = 1;
	    const STORE_VALUE = 1;
	    const VAULT_GROUP = 0;
	    const FLOW_GROUP = 1;
	    const STORE_GROUP = 2;
	
		<a href="/keys">
		<AppRailTile name="vault" value={VAULT_VALUE} title="vault" group={VAULT_GROUP}>
			<span class="text-xl">🗝️</span>
		</AppRailTile>
		</a>
		<a href="/flow">
		<AppRailTile name="flow" value={FLOW_VALUE} title="flow" group={FLOW_GROUP}>
			<span class="text-xl">📋</span>
		</AppRailTile>
		</a>
		<a href="/store">
			<AppRailTile name="store" value={STORE_VALUE} title="store" group={STORE_GROUP}>
				<span class="text-xl">💽</span>
			</AppRailTile>
		</a>
	</AppRail>
	</svelte:fragment>
	<slot style="margin-top:50px" />
</AppShell>
