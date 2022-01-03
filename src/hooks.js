import {ApplicationError} from '/domain/core/error';

/** @type {import('@sveltejs/kit').HandleError} */
export async function handleError({ error }) {
  /** @type {ApplicationError} */
  const app = new ApplicationError()
  await app.sendError(error);
}
