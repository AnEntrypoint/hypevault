<script>
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	let currentTile;
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
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
	<a href="/keys">
	<AppRailTile name="vault" value={0} title="vault" group="0">
		<span class="text-xl">🗝️</span>
	</AppRailTile>
	</a>
	<a href="/flow">
	<AppRailTile name="flow" value={1} title="flow" group="1">
		<span class="text-xl">📋</span>
	</AppRailTile>
	</a>
	<a href="/store">
		<AppRailTile name="store" value={1} title="store" group="2">
			<span class="text-xl">💽</span>
		</AppRailTile>
	</a>
</AppRail>
</svelte:fragment>
	<slot style="margin-top:50px" />
</AppShell>
