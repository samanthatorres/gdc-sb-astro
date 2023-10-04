import StoryblokClient from 'storyblok-js-client'

 
export default async function () {
  let Storyblok = new StoryblokClient({
    accessToken: 'GJrea8cr4pPAliyfbBP8UAtt',
    cache: {
      clear: 'auto',
      type: 'memory',
    },
  })
 
  const { data } = await Storyblok.get('cdn/stories/redirects', {
    version: 'draft',
  })
 
  const redirects = data.story.content.redirect_entries
 
  let processedRedirects = {}
 
  for (const redirect of redirects) {
    const targetUrl = redirect.destination.cached_url 
    processedRedirects[redirect.source_url] = targetUrl
  }
 
  return processedRedirects
}