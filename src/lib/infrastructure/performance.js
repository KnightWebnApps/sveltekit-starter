import { getCLS, getFID, getLCP } from 'web-vitals';
import { performance } from '$lib/application/performanceStore'


getCLS(performance.addToQueue)
getFID(performance.addToQueue)
getLCP(performance.addToQueue)