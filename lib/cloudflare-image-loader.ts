/**
 * Cloudflare Image Loader for Next.js
 * 
 * Custom image loader that optimizes images using Cloudflare Images
 * or falls back to standard optimization.
 */

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  const useCloudflareImages = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ENABLED === "true";

  if (useCloudflareImages && process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH) {
    const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
    const imagePath = src.startsWith("/") ? src.slice(1) : src;

    const params = new URLSearchParams({
      width: width.toString(),
      quality: (quality || 85).toString(),
      format: "auto",
    });

    return `https://imagedelivery.net/${accountHash}/${imagePath}?${params.toString()}`;
  }

  const params = new URLSearchParams({
    w: width.toString(),
    q: (quality || 85).toString(),
    f: "auto",
  });

  return `${src}?${params.toString()}`;
}
