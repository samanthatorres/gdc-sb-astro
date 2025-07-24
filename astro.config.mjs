import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { getRedirects } from "./src/functions/getRedirects";
import { defineConfig } from 'astro/config';
import vercelStatic from '@astrojs/vercel/static';

import vercel from "@astrojs/vercel";

const env = loadEnv("", process.cwd(), ["STORYBLOK", "PUBLIC"]);
const isDevelopment = process.env.NODE_ENV === 'development' || process.argv.includes('dev');
const redirects = await getRedirects();
const vercelEnv = process.env.VERCEL_ENV;

// https://astro.build/config
export default defineConfig({
  site: isDevelopment ? 'https://dev.thegray.company' : 'https://thegray.company',
  redirects,
  integrations: [storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    apiOptions: {
      region: "us",
    },
    bridge: vercelEnv !== 'production',
    resolveLinks: "url",
    components: {
      author: "storyblok/Author",
      blog: "storyblok/Blog",
      bloglist: "storyblok/BlogList",
      carousel: "storyblok/Carousel",
      childhero: "storyblok/ChildHero",
      config: "storyblok/Config",
      embed: "storyblok/Embed",
      featured_blogs: "storyblok/FeaturedBlogs",
      fourup: "storyblok/FourUp",
      hero: "storyblok/Hero",
      iconcard: "storyblok/IconCard",
      image: "storyblok/Image",
      leftright: "storyblok/LeftRight",
      listitem: "storyblok/Listitem",
      liststack: "storyblok/Liststack",
      page: "storyblok/Page",
      quote: "storyblok/Quote",
      quotes: "storyblok/Quotes",      
      redirects_config: "storyblok/Redirect",
      sidebyside: "storyblok/SideBySide",
      testimonial: "storyblok/Testimonial",
      testimonials: "storyblok/Testimonials",
      textblock: "storyblok/Textblock",
      threecolumn: "storyblok/ThreeColumn",
      video: "storyblok/Video",
      wysiwyg: "storyblok/Wysiwyg",
    }
  })
],
  vite: {
    optimizeDeps: { exclude: ["fsevents"] },
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  build: {
    format: 'directory'
  },
  trailingSlash: 'never',
  output: vercelEnv === 'preview' ? 'server' : 'static',
  adapter: vercelEnv === 'preview' ? vercel() : undefined,
});