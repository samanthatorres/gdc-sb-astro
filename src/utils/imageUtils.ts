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

export function getResponsiveImageSrc(src: string, baseSize: number = 80): { src: string; srcset?: string } {
  if (!src.startsWith('http')) {
    return { src };
  }

  const baseUrl = transformImageSrc(`${src}/m/${baseSize}x${baseSize}`);
  const highResUrl = transformImageSrc(`${src}/m/${baseSize * 2}x${baseSize * 2}`);

  return {
    src: baseUrl,
    srcset: `${baseUrl} 1x, ${highResUrl} 2x`
  };
}
