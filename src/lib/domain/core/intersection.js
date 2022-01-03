/**
 * Create an intersection observer that calls onIntersection when the provided selector element is 100% visible (by default) or using the given threshold.
 * @param {string} elementSelector
 * @param {void} onIntersection 
 * @param {number|number[]} threshold
 * @returns IntersectionObserver
 */
export const createViewportObserver = (elementSelector, onIntersection, threshold = 1.0) => {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					onIntersection();
				}
			});
		},
		{
			root: null,
			threshold
		}
	);
	observer.observe(document.querySelector(elementSelector));
	return observer;
};