/**
 * Hero vizuál — SVG blesk s orbit ringy a jiskrami (přesný přenos z původního webu).
 */
export default function HeroVisual() {
  return (
    <div className="hero-visual reveal delay-2">
      <svg className="hero-svg" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FFD600" />
            <stop offset="100%" stopColor="#FFB400" />
          </linearGradient>
          <radialGradient id="coreGrad">
            <stop offset="0%" stopColor="#fff" stopOpacity=".9" />
            <stop offset="60%" stopColor="#FFD600" stopOpacity=".3" />
            <stop offset="100%" stopColor="#FFD600" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="180" className="ring-orbit" />
        <circle cx="200" cy="200" r="140" className="ring-orbit r2" />
        <circle cx="200" cy="200" r="100" fill="url(#coreGrad)" />
        <path className="bolt-main" d="M225 60 L130 215 L185 215 L165 340 L275 175 L215 175 L240 60 Z" />
        <circle className="spark" cx="80" cy="120" r="3" />
        <circle className="spark" cx="320" cy="100" r="2.5" style={{ animationDelay: ".6s" }} />
        <circle className="spark" cx="340" cy="280" r="3" style={{ animationDelay: "1.2s" }} />
        <circle className="spark" cx="60" cy="300" r="2" style={{ animationDelay: "1.8s" }} />
        <circle className="spark" cx="370" cy="200" r="2.5" style={{ animationDelay: "2.4s" }} />
        <circle className="spark" cx="30" cy="200" r="2" style={{ animationDelay: "3s" }} />
      </svg>
    </div>
  );
}
