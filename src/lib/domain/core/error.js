import * as fs from 'fs';
// import {  } from '$app/env'
export class ApplicationError extends Error {
	constructor(message, stack, name, code, status) {
		super(message, stack, name, code, status);
	}
  /**
   * @param {Error} error
   * @returns Promise<void> 
   */
	async sendError(error) {
		const resp = await fetch(import.meta.env.VITE_ERROR_PATH, {
			method: 'POST',
			body: JSON.stringify({
				...error,
				version: JSON.parse(fs.readFileSync(new URL('package.json', import.meta.url), 'utf8'))
			})
		});

		if (resp.ok) {
			console.warn('Error Sent - ' + resp.status);
			return;
		}

		console.error('Error Send Failed - ' + resp.status);
		console.error(await resp.json());
		return;
	}

  toJson(){
    return {
      error: {
        message: this.message,
        stack: this.stack,
      }
    }
  }
}
