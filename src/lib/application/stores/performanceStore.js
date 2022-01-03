import { writable } from 'svelte/store';

const createPerformanceStore = () => {
	const queue = new Set();
	const { subscribe, update } = writable(queue);

	function addToQueue(metric) {
		update((q) => q.add(metric));
	}

	function flushQueue() {
		if (queue.size > 0) {
			// Replace with whatever serialization method you prefer.
			// Note: JSON.stringify will likely include more data than you need.
			const body = JSON.stringify([...queue]);

			// Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
			(navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
				fetch('/analytics', { body, method: 'POST', keepalive: true });

			update(q => q.clear())
		}
	}

	// Report all available metrics whenever the page is backgrounded or unloaded.
	addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') {
			flushQueue();
		}
	});

	// NOTE: Safari does not reliably fire the `visibilitychange` event when the
	// page is being unloaded. If Safari support is needed, you should also flush
	// the queue in the `pagehide` event.
	addEventListener('pagehide', flushQueue);

	return {
		subscribe,
		addToQueue
	};
};

export const performance = createPerformanceStore();