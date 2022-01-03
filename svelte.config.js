import adapter from '@sveltejs/adapter-auto';
import path from 'path'
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$stores: path.resolve('./src/lib/application/stores')
				}
			}
		}
	}
};

export default config;
