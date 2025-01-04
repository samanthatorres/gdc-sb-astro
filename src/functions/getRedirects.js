import { loadEnv } from "vite";
import StoryblokClient from "storyblok-js-client";

const env = loadEnv("", process.cwd(), "STORYBLOK");

export async function getRedirects() {
  const storyblokApi = new StoryblokClient({
    region: "us",
    accessToken: env.STORYBLOK_TOKEN,
    cache: {
      clear: "auto",
      type: "memory",
    },
  });

  const { data } = await storyblokApi.get("cdn/stories/redirects", {
    version: "draft",
    resolve_relations: "redirect_entry.destination",
  });

  const storyblockRedirects = data.story.content.redirect_entries;
  const astroRedirects = {};
  for (const redirect of storyblockRedirects) {
    let targetUrl;
    if (redirect.external_destination) {
      targetUrl = redirect.external_destination;
    } else {
      targetUrl =
        redirect.destination.full_slug === "home"
          ? "/"
          : `/${redirect.destination.full_slug}`;
    }
    astroRedirects[redirect.source_url] = targetUrl;
  }

  console.log(`Found #${Object.keys(astroRedirects).length} redirects`);
  return astroRedirects;
}
