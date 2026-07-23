export function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="h-full w-full object-cover"
        style={{ transform: "scale(1.4)" }}
        src="/images/hero-animation.mp4"
        poster="/images/hero.webp"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}
