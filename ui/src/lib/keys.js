import { browser } from '$app/environment';
import { writable } from 'svelte/store';
const name = 'keys'
const defaultValue = "[]";
const initialValue = browser ? window.localStorage.getItem(name) ?? defaultValue : defaultValue;

const data = writable(initialValue);

data.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem(name, value);
	}
});

export default data;