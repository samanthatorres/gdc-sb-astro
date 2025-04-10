export function transformImageSrc(src: string, customDomain: string = 'assets.thegray.company'): string {
  const url = new URL(src);
  if (url.hostname === 'a-us.storyblok.com') {
    url.hostname = customDomain;
  }
  return url.href;
} 