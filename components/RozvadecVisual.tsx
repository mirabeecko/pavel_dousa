/**
 * Rozvaděč vizuál — SVG schéma rozvaděče s jističi, chrániči a popisky
 * (přesný přenos z původního webu).
 */
export default function RozvadecVisual({ tags }: { tags: [string, string, string] }) {
  return (
    <div className="rozvadec-visual reveal delay-2">
      <span className="tag t1">{tags[0]}</span>
      <span className="tag t2">{tags[1]}</span>
      <span className="tag t3">{tags[2]}</span>
      <svg className="rozvadec-svg" viewBox="0 0 280 360">
        <rect x="20" y="20" width="240" height="320" rx="10" fill="#0d1018" stroke="rgba(0,212,255,.4)" strokeWidth="1.5" />
        <rect x="32" y="32" width="216" height="36" rx="4" fill="#11151f" stroke="rgba(255,255,255,.08)" />
        <text x="44" y="55" fontFamily="JetBrains Mono" fontSize="11" fill="#FFD600" fontWeight="700">P. DOUŠA · ROZVADĚČ</text>
        <circle cx="232" cy="50" r="3" fill="#00ff9d">
          <animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite" />
        </circle>

        <g>
          <rect x="32" y="80" width="216" height="50" rx="4" fill="#11151f" stroke="rgba(255,255,255,.08)" />
          <rect x="42" y="90" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#FFD600" strokeWidth="1" />
          <rect x="44" y="95" width="16" height="6" rx="1" fill="#FFD600" />
          <rect x="68" y="90" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#FFD600" strokeWidth="1" />
          <rect x="70" y="95" width="16" height="6" rx="1" fill="#FFD600" />
          <rect x="94" y="90" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#00D4FF" strokeWidth="1" />
          <rect x="96" y="95" width="16" height="6" rx="1" fill="#00D4FF" />
          <rect x="120" y="90" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="146" y="90" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="172" y="90" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="198" y="90" width="40" height="30" rx="2" fill="#1a1f2c" stroke="#FF3B30" />
          <text x="218" y="110" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#FF3B30" fontWeight="700">RCD</text>
        </g>

        <g>
          <rect x="32" y="142" width="216" height="50" rx="4" fill="#11151f" stroke="rgba(255,255,255,.08)" />
          <rect x="42" y="152" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#00D4FF" />
          <rect x="68" y="152" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#00D4FF" />
          <rect x="94" y="152" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#00D4FF" />
          <rect x="120" y="152" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="146" y="152" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="172" y="152" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="198" y="152" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="224" y="152" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#FFD600" />
        </g>

        <g>
          <rect x="32" y="204" width="216" height="50" rx="4" fill="#11151f" stroke="rgba(255,255,255,.08)" />
          <rect x="42" y="214" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#FFD600" />
          <rect x="68" y="214" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="94" y="214" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="120" y="214" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="146" y="214" width="20" height="30" rx="2" fill="#1a1f2c" stroke="rgba(255,255,255,.2)" />
          <rect x="172" y="214" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#00D4FF" />
          <rect x="198" y="214" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#00D4FF" />
          <rect x="224" y="214" width="20" height="30" rx="2" fill="#1a1f2c" stroke="#00D4FF" />
        </g>

        <line x1="32" y1="280" x2="248" y2="280" stroke="rgba(255,214,0,.5)" strokeWidth="2" />
        <line x1="32" y1="288" x2="248" y2="288" stroke="rgba(255,214,0,.3)" strokeWidth="1" />
        <line x1="32" y1="296" x2="248" y2="296" stroke="rgba(0,212,255,.3)" strokeWidth="1" />

        <g>
          <line x1="60" y1="120" x2="60" y2="145" stroke="rgba(255,214,0,.6)" strokeWidth="1" />
          <line x1="100" y1="120" x2="100" y2="145" stroke="rgba(0,212,255,.5)" strokeWidth="1" />
          <line x1="180" y1="120" x2="180" y2="145" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
        </g>

        <text x="44" y="320" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.4)">// 16 modulů · CERT OK</text>
        <circle cx="232" cy="318" r="3" fill="#FFD600">
          <animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
