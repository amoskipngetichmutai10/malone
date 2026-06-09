/**
 * Image optimization utilities for better performance
 * Handles image sizing, responsive variants, and quality settings
 */

interface ImageVariant {
  size: number;
  quality?: number;
}

const defaultVariants: Record<string, ImageVariant> = {
  thumbnail: { size: 300, quality: 80 },
  small: { size: 600, quality: 85 },
  medium: { size: 1024, quality: 85 },
  large: { size: 1920, quality: 90 },
  xlarge: { size: 2560, quality: 90 },
};

/**
 * Generate Cloudinary URL with optimization parameters
 * @param baseUrl - Cloudinary URL
 * @param width - Image width in pixels
 * @param height - Image height in pixels
 * @param quality - Quality setting (1-100)
 * @returns Optimized Cloudinary URL
 */
export function optimizeCloudinaryUrl(
  baseUrl: string,
  width?: number,
  height?: number,
  quality: number = 85
): string {
  if (!baseUrl.includes('cloudinary.com')) return baseUrl;

  const params: string[] = [];
  if (width) params.push(`w_${width}`);
  if (height) params.push(`h_${height}`);
  params.push(`q_${quality}`);
  params.push('f_auto'); // Auto format (WebP, AVIF for supported browsers)
  params.push('c_fill'); // Fill to dimensions

  const uploadIndex = baseUrl.indexOf('/upload/');
  if (uploadIndex === -1) return baseUrl;

  const basepart = baseUrl.substring(0, uploadIndex + 8);
  const path = baseUrl.substring(uploadIndex + 8);

  return `${basepart}${params.join(',')},/${path}`;
}

/**
 * Generate responsive image srcset
 * @param baseUrl - Cloudinary base URL
 * @param variant - Size variant to optimize for
 * @returns srcset string for responsive images
 */
export function generateSrcSet(baseUrl: string, variant: string = 'large'): string {
  const sizes = [600, 1024, 1920, 2560];
  return sizes
    .map((size) => `${optimizeCloudinaryUrl(baseUrl, size, undefined, 85)} ${size}w`)
    .join(', ');
}

/**
 * Get responsive image sizes string for srcset optimization
 * @returns sizes attribute value
 */
export function getResponsiveSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 80vw, 1920px';
}

/**
 * Preload image for better performance
 * @param imageUrl - URL to preload
 */
export function preloadImage(imageUrl: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageUrl;
  document.head.appendChild(link);
}

/**
 * Prefetch multiple images
 * @param imageUrls - Array of URLs to prefetch
 */
export function prefetchImages(imageUrls: string[]): void {
  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

export default {
  optimizeCloudinaryUrl,
  generateSrcSet,
  getResponsiveSizes,
  preloadImage,
  prefetchImages,
  defaultVariants,
};
