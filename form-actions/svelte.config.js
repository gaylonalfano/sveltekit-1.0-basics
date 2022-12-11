import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
	kit: {
		adapter: adapter(),
    // FIXME: Encountered Cross-site errors as soon as I started using use:enhance.
    // Found a few sites on Vite/SK config issues between DEV and PRODUCTION:
    // REF: https://stackoverflow.com/questions/73790956/cross-site-post-form-submissions-are-forbidden
    // REF: https://github.com/sveltejs/kit/issues/6589
    csrf: {
      checkOrigin: false,  // NOT safe for production!
    },
    env: {
      dir: "."
    }
	}
};

export default config;
