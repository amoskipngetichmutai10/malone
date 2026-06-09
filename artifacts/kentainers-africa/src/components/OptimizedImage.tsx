import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * OptimizedImage component for better performance
 * Features:
 * - Lazy loading (except when priority=true)
 * - Responsive image sizing
 * - Proper aspect ratio handling
 * - Loading state management
 * - SEO-friendly with proper alt text
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(priority);
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    if (!priority) {
      // For non-priority images, use intersection observer for lazy loading
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setIsLoaded(true);
      img.src = src;
    }
  }, [src, priority]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setIsLoaded(true)}
    />
  );
}
