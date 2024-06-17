import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import tailwind from "@astrojs/tailwind";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { getRedirects } from "./src/functions/getRedirects";
import netlify from "@astrojs/netlify/functions";

const env = loadEnv("", process.cwd(), "STORYBLOK");
const redirects = await getRedirects();

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  redirects,
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      apiOptions: {
        region: "us",
      },
      bridge: {
        resolveLinks: "url",
      },
      components: {
        page: "storyblok/Page",
        blog: "storyblok/Blog",
        feature: "storyblok/Feature",
        grid: "storyblok/Grid",
        hero: "storyblok/Hero",
        config: "storyblok/Config",
        liststack: "storyblok/Liststack",
        rich_text: "storyblok/RichText",
        listitem: "storyblok/Listitem",
        author: "storyblok/Author",
        banner: "storyblok/Banner",
        video: "storyblok/Video",
        carousel: "storyblok/Carousel",
        textblock: "storyblok/Textblock",
        leftright: "storyblok/LeftRight",
        wysiwyg: "storyblok/Wysiwyg",
        redirects_config: "storyblok/Redirect",
        childhero: "storyblok/ChildHero"
      },
    }),
    tailwind(),
  ],
  vite: {
    optimizeDeps: { exclude: ["fsevents"] },
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  build: {
    format: "file",
  },
});
