import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import tailwind from "@astrojs/tailwind";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { getRedirects } from "./src/functions/getRedirects";
import netlify from "@astrojs/netlify";

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
        author: "storyblok/Author",
        banner: "storyblok/Banner",
        blog: "storyblok/Blog",
        bloglist: "storyblok/BlogList",
        carousel: "storyblok/Carousel",
        childhero: "storyblok/ChildHero",
        config: "storyblok/Config",
        feature: "storyblok/Feature",
        featured_blogs: "storyblok/FeaturedBlogs",
        four_up: "storyblok/FourUp",
        grid: "storyblok/Grid",
        hero: "storyblok/Hero",
        leftright: "storyblok/LeftRight",
        listitem: "storyblok/Listitem",
        liststack: "storyblok/Liststack",
        page: "storyblok/Page",
        redirects_config: "storyblok/Redirect",
        rich_text: "storyblok/RichText",
        textblock: "storyblok/Textblock",
        video: "storyblok/Video",
        wysiwyg: "storyblok/Wysiwyg",
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
