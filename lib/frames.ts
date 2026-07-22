export const FRAME_COUNT = 120;

export function getFramePaths(count: number = FRAME_COUNT) {
  return Array.from({ length: count }, (_, i) => `/frames/frame_${String(i).padStart(4, "0")}.webp`);
}

export function preloadImages(paths: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    paths.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new window.Image();
          img.decoding = "async";
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
          img.src = src;
        }),
    ),
  );
}
