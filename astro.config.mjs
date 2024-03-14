import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    mode: "directory",
    functionPerRoute: false,
    routes: {
      exclude: ['/post/*']
    }
  }),
  integrations: [mdx(), db()]
});