				import worker, * as OTHER_EXPORTS from "/Users/serdar/dev/projects/my-astro-app/.wrangler/tmp/pages-OccBYR/functionsWorker-0.5943939965523632.mjs";
				import * as __MIDDLEWARE_0__ from "/Users/serdar/dev/projects/my-astro-app/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";
				const envWrappers = [__MIDDLEWARE_0__.wrap].filter(Boolean);
				const facade = {
					...worker,
					envWrappers,
					middleware: [
						__MIDDLEWARE_0__.default,
            ...(worker.middleware ? worker.middleware : []),
					].filter(Boolean)
				}
				export * from "/Users/serdar/dev/projects/my-astro-app/.wrangler/tmp/pages-OccBYR/functionsWorker-0.5943939965523632.mjs";

				const maskDurableObjectDefinition = (cls) =>
					class extends cls {
						constructor(state, env) {
							let wrappedEnv = env
							for (const wrapFn of envWrappers) {
								wrappedEnv = wrapFn(wrappedEnv)
							}
							super(state, wrappedEnv);
						}
					};
				

				export default facade;