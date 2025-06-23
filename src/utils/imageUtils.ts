export function transformImageSrc(src: string, customDomain: string = 'assets.thegray.company'): string {
  try {
    const url = new URL(src);
    if (url.hostname === 'a-us.storyblok.com') {
      url.hostname = customDomain;
    }
    return url.href;
  } catch (error) {
    // If the src is not a valid URL, return it as-is
    console.warn(`Invalid URL provided to transformImageSrc: ${src}`);
    return src;
  }
} 