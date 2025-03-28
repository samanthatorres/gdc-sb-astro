import { storyblok } from "@storyblok/astro";
import { loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { getRedirects } from "./src/functions/getRedirects";
import { defineConfig } from 'astro/config';
import vercelStatic from '@astrojs/vercel/static';

const env = loadEnv("", process.cwd(), ["STORYBLOK", "PUBLIC"]);
const isDevelopment = process.env.NODE_ENV === 'development' || process.argv.includes('dev');
const redirects = await getRedirects();

// https://astro.build/config
export default defineConfig({
  site: isDevelopment ? 'https://dev.thegray.company' : 'https://thegray.company',
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
        blog: "storyblok/Blog",
        bloglist: "storyblok/BlogList",
        carousel: "storyblok/Carousel",
        childhero: "storyblok/ChildHero",
        config: "storyblok/Config",
        featured_blogs: "storyblok/FeaturedBlogs",
        fourup: "storyblok/FourUp",
        hero: "storyblok/Hero",
        iconcard: "storyblok/IconCard",
        image: "storyblok/Image",
        leftright: "storyblok/LeftRight",
        listitem: "storyblok/Listitem",
        liststack: "storyblok/Liststack",
        page: "storyblok/Page",
        redirects_config: "storyblok/Redirect",
        sidebyside: "storyblok/SideBySide",
        testimonial: "storyblok/Testimonial",
        testimonials: "storyblok/Testimonials",
        textblock: "storyblok/Textblock",
        threecolumn: "storyblok/ThreeColumn",
        video: "storyblok/Video",
        wysiwyg: "storyblok/Wysiwyg",
      }
    }),
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
  output: 'static',
  adapter: vercelStatic()
});
