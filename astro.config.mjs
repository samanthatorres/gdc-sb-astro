import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import tailwind from "@astrojs/tailwind";
import basicSsl from '@vitejs/plugin-basic-ssl';
const env = loadEnv("", process.cwd(), 'STORYBLOK');

// https://astro.build/config
export default defineConfig({
  integrations: [storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    apiOptions: {
      region: "us"
    },
    components: {
        page: 'storyblok/Page',
        blog: 'storyblok/Blog',
        feature: 'storyblok/Feature',
        grid: 'storyblok/Grid',
        hero: 'storyblok/Hero',
        config: 'storyblok/Config',
        liststack: 'storyblok/Liststack',
        rich_text: "storyblok/RichText",
        listitem: 'storyblok/Listitem',
        author: 'storyblok/Author',
        banner: 'storyblok/Banner',
        video: 'storyblok/Video'
    }
  }), tailwind()],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true
    }
  }
});