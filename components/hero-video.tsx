export function HeroVideo() {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src="/images/hero-animation.mp4"
      poster="/images/hero.webp"
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
