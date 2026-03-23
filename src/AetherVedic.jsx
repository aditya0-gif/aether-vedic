import { useState, useEffect } from "react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #030303; }

  :root {
    --bg:      #030303;
    --card:    #070707;
    --gold:    #C5A059;
    --gold2:   #9B7A3E;
    --gold3:   #E8C87A;
    --border:  #141414;
    --border2: #201808;
    --text:    #DDD0BA;
    --text2:   #7A6B55;
    --text3:   #3A3228;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blinkColon {
    0%,48%  { opacity: 1; }
    50%,98% { opacity: 0.1; }
    100%    { opacity: 1; }
  }
  @keyframes shimmerBar {
    from { transform: translateX(-120%); }
    to   { transform: translateX(400%); }
  }
  @keyframes barIn {
    from { width: 0; }
  }
  @keyframes needlePulse {
    0%,100% { box-shadow: 0 0 4px rgba(197,160,89,0.4); }
    50%     { box-shadow: 0 0 10px rgba(197,160,89,0.9); }
  }

  .aether {
    min-height: 100vh;
    background: var(--bg);
    padding: 18px 20px;
    font-family: 'Cormorant Garamond', serif;
    color: var(--text);
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
    animation: fadeUp 0.55s ease both;
    transition: border-color 0.35s;
  }
  .card:hover { border-color: var(--border2); }

  ::-webkit-scrollbar { width: 2px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #4A3820; border-radius: 1px; }
`;

// ─── CHART GEOMETRY ───────────────────────────────────────────────────────────
const P = {
  TL:[0,0],   TM:[200,0],  TR:[400,0],
  RM:[400,200],BR:[400,400],BM:[200,400],
  BL:[0,400], LM:[0,200],  C:[200,200],
  A:[100,100],B:[300,100], D:[300,300], E:[100,300],
};
const ps = arr => arr.map(([x,y])=>`${x},${y}`).join(" ");

const HOUSES = [
  { n:1,  sign:"Aries",       sig:"Ar", poly:[P.TM,P.B,P.C,P.A],      cx:200,cy:105, lagna:true  },
  { n:2,  sign:"Taurus",      sig:"Ta", poly:[P.TM,P.TR,P.B],          cx:300,cy:36              },
  { n:3,  sign:"Gemini",      sig:"Ge", poly:[P.TR,P.RM,P.B],          cx:368,cy:105             },
  { n:4,  sign:"Cancer",      sig:"Ca", poly:[P.RM,P.B,P.C,P.D],       cx:300,cy:200             },
  { n:5,  sign:"Leo",         sig:"Le", poly:[P.RM,P.BR,P.D],          cx:368,cy:300             },
  { n:6,  sign:"Virgo",       sig:"Vi", poly:[P.BR,P.BM,P.D],          cx:300,cy:366             },
  { n:7,  sign:"Libra",       sig:"Li", poly:[P.BM,P.E,P.C,P.D],       cx:200,cy:297, kendra:true },
  { n:8,  sign:"Scorpio",     sig:"Sc", poly:[P.BL,P.BM,P.E],          cx:100,cy:366             },
  { n:9,  sign:"Sagittarius", sig:"Sg", poly:[P.BL,P.LM,P.E],          cx:34, cy:300             },
  { n:10, sign:"Capricorn",   sig:"Cp", poly:[P.LM,P.E,P.C,P.A],       cx:100,cy:200             },
  { n:11, sign:"Aquarius",    sig:"Aq", poly:[P.TL,P.LM,P.A],          cx:34, cy:105             },
  { n:12, sign:"Pisces",      sig:"Pi", poly:[P.TL,P.TM,P.A],          cx:100,cy:36              },
];

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PLANETS = [
  { name:"Sun",     abbr:"Su", house:5,  sym:"☉", col:"#E8A830", dignity:"Friend",   str:72 },
  { name:"Moon",    abbr:"Mo", house:10, sym:"☽", col:"#BDD4E8", dignity:"Neutral",  str:58 },
  { name:"Mars",    abbr:"Ma", house:1,  sym:"♂", col:"#D04840", dignity:"Own Sign", str:84 },
  { name:"Mercury", abbr:"Me", house:2,  sym:"☿", col:"#60C870", dignity:"Friend",   str:65 },
  { name:"Jupiter", abbr:"Ju", house:4,  sym:"♃", col:"#E8C050", dignity:"Exalted",  str:96 },
  { name:"Venus",   abbr:"Ve", house:11, sym:"♀", col:"#F0A0C0", dignity:"Friend",   str:70 },
  { name:"Saturn",  abbr:"Sa", house:7,  sym:"♄", col:"#8888A8", dignity:"Exalted",  str:95 },
  { name:"Rahu",    abbr:"Ra", house:3,  sym:"☊", col:"#A880C8", dignity:"Neutral",  str:62 },
  { name:"Ketu",    abbr:"Ke", house:9,  sym:"☋", col:"#C8A878", dignity:"Neutral",  str:58 },
];

const YOGAS = [
  {
    name:"Hamsa Mahāpurusha", sans:"हंस महापुरुष",
    desc:"Jupiter exalted in Cancer — sovereign wisdom and divine institutional grace.",
    insight:"Roles of philosophical authority become accessible. Academic and sacred prestige compounds.",
    str:96, planet:"Jupiter", col:"#E8C050",
  },
  {
    name:"Shasha Mahāpurusha", sans:"शश महापुरुष",
    desc:"Saturn exalted in Libra — unyielding discipline forges structural empires.",
    insight:"Long-arc patience compounds into unassailable positional advantage. Systemic mastery.",
    str:95, planet:"Saturn", col:"#8888A8",
  },
  {
    name:"Gaja Kesari", sans:"गज केसरी",
    desc:"Jupiter in kendra from Moon — the elephant-lion formation of executive brilliance.",
    insight:"Public influence and social capital multiply exponentially through institutional networks.",
    str:94, planet:"Jupiter", col:"#E8C050",
  },
  {
    name:"Dhana Yoga", sans:"धन योग",
    desc:"Venus (lord of 2nd) placed in 11th — wealth-gates align perfectly with gain-houses.",
    insight:"High-velocity capital formation through aesthetics, relationships, and social networks.",
    str:88, planet:"Venus", col:"#F0A0C0",
  },
  {
    name:"Ruchaka Mahāpurusha", sans:"रुचक महापुरुष",
    desc:"Mars in own sign Aries in the 1st kendra — native martial excellence.",
    insight:"Competitive dominance is inherent, not manufactured. Will supersedes all structural obstacles.",
    str:84, planet:"Mars", col:"#D04840",
  },
];

const DASHA = [
  { name:"Moon",    yrs:10, col:"#BDD4E8", start:1986, end:1996 },
  { name:"Mars",    yrs:7,  col:"#D04840", start:1996, end:2003 },
  { name:"Rahu",    yrs:18, col:"#A880C8", start:2003, end:2021 },
  { name:"Jupiter", yrs:16, col:"#E8C050", start:2021, end:2037, current:true },
  { name:"Saturn",  yrs:19, col:"#8888A8", start:2037, end:2056 },
  { name:"Mercury", yrs:17, col:"#60C870", start:2056, end:2073 },
  { name:"Ketu",    yrs:7,  col:"#C8A878", start:2073, end:2080 },
  { name:"Venus",   yrs:20, col:"#F0A0C0", start:2080, end:2100 },
];

const FULL_SPAN = DASHA[DASHA.length-1].end - DASHA[0].start;
const NOW = 2026;
const NOW_PCT = ((NOW - DASHA[0].start) / FULL_SPAN) * 100;
const JUP_PROGRESS = Math.round(((NOW - 2021) / 16) * 100);

// ─── DIGITAL CLOCK ────────────────────────────────────────────────────────────
function DigitalClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(t.getHours()).padStart(2,"0");
  const mm = String(t.getMinutes()).padStart(2,"0");
  const ss = String(t.getSeconds()).padStart(2,"0");
  return (
    <div style={{ fontFamily:"'Cinzel',serif", fontSize:12, letterSpacing:"0.15em", color:"#5A4A30", display:"flex", alignItems:"center" }}>
      <span>{hh}</span>
      <span style={{ animation:"blinkColon 1s step-end infinite", margin:"0 1.5px" }}>:</span>
      <span>{mm}</span>
      <span style={{ animation:"blinkColon 1s step-end infinite", margin:"0 1.5px" }}>:</span>
      <span style={{ color:"#3A2E1C" }}>{ss}</span>
    </div>
  );
}

// ─── NORTH INDIAN CHART ───────────────────────────────────────────────────────
function NorthIndianChart() {
  const [hover, setHover] = useState(null);

  const byHouse = {};
  PLANETS.forEach(p => {
    (byHouse[p.house] = byHouse[p.house] || []).push(p);
  });

  return (
    <div style={{ padding:"22px 22px 16px", height:"100%", display:"flex", flexDirection:"column", gap:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:"0.25em", color:"#4A3820", textTransform:"uppercase" }}>
            Natal Chart
          </div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:15, color:"var(--gold)", marginTop:3, letterSpacing:"0.05em" }}>
            Aries Lagna · 23°
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:"#2E2416", fontStyle:"italic" }}>North Indian</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:"#2E2416", fontStyle:"italic" }}>Parashari · D1</div>
        </div>
      </div>

      <svg viewBox="0 0 400 400" style={{ width:"100%", flex:1, maxHeight:320 }}>
        <defs>
          <radialGradient id="lagnaFill" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="#C5A059" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0.01"/>
          </radialGradient>
          <radialGradient id="kendraFill" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="#C5A059" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0"/>
          </radialGradient>
          <filter id="planetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {HOUSES.map(h => (
          <polygon
            key={h.n}
            points={ps(h.poly)}
            fill={
              h.lagna   ? "url(#lagnaFill)"  :
              h.kendra  ? "url(#kendraFill)" :
              hover===h.n ? "rgba(197,160,89,0.06)" :
              "rgba(197,160,89,0.01)"
            }
            stroke="none"
            onMouseEnter={() => setHover(h.n)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor:"default", transition:"fill 0.25s" }}
          />
        ))}

        <rect x="0.5" y="0.5" width="399" height="399"
          fill="none" stroke="#201808" strokeWidth="1"/>
        <polygon points="200,0 400,200 200,400 0,200"
          fill="none" stroke="#201808" strokeWidth="1"/>
        <line x1="0" y1="0" x2="400" y2="400" stroke="#201808" strokeWidth="1"/>
        <line x1="400" y1="0" x2="0" y2="400" stroke="#201808" strokeWidth="1"/>

        {HOUSES.map(h => (
          <text
            key={`n${h.n}`}
            x={h.cx} y={h.cy - 10}
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="'Cinzel',serif"
            fontSize={h.lagna ? "11" : "9"}
            fontWeight={h.lagna ? "600" : "400"}
            fill={h.lagna ? "var(--gold)" : "#3A2E1C"}
            letterSpacing="0.05em"
          >{h.n}</text>
        ))}

        {HOUSES.map(h => (
          <text
            key={`s${h.n}`}
            x={h.cx} y={h.cy + 4}
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="'Cormorant Garamond',serif"
            fontSize="7" fontStyle="italic"
            fill={h.lagna ? "#7A5A2E" : "#2A2015"}
          >{h.sig}</text>
        ))}

        {HOUSES.map(h => {
          const planets = byHouse[h.n] || [];
          if (!planets.length) return null;
          return planets.map((p, i) => {
            const yOff = h.cy + 18 + (i - (planets.length-1)/2) * 13;
            return (
              <text
                key={p.name}
                x={h.cx} y={yOff}
                textAnchor="middle" dominantBaseline="middle"
                fontFamily="'Cinzel',serif"
                fontSize="10" fontWeight="600"
                fill={p.col}
                filter="url(#planetGlow)"
                letterSpacing="0.04em"
              >{p.abbr}</text>
            );
          });
        })}

        <text x="200" y="176"
          textAnchor="middle"
          fontFamily="'Cinzel',serif"
          fontSize="6.5" letterSpacing="0.2em"
          fill="#C5A059" opacity="0.45"
        >ASC</text>
      </svg>

      <div style={{ display:"flex", flexWrap:"wrap", gap:"5px 14px" }}>
        {PLANETS.map(p => (
          <div key={p.name} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:p.col, flexShrink:0 }}/>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:8, color:"#5A4A30", letterSpacing:"0.08em" }}>{p.abbr}</span>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:9, color:"#2E2416", fontStyle:"italic" }}>{p.dignity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DASHA TIMELINE ───────────────────────────────────────────────────────────
function DashaTimeline() {
  return (
    <div style={{ padding:"20px 22px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:16 }}>
        <div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:"0.25em", color:"#4A3820", textTransform:"uppercase", marginBottom:3 }}>
            Vimshottari Dasha
          </div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, color:"var(--gold)", letterSpacing:"0.04em" }}>
            Jupiter Mahādasha
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:"#5A4A30", fontStyle:"italic", marginLeft:8, fontWeight:300 }}>
              2021 – 2037
            </span>
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:8, color:"#4A3820", letterSpacing:"0.12em", marginBottom:2 }}>Antardasha</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:"#E8C050", fontStyle:"italic" }}>
            Jupiter · Mercury
          </div>
        </div>
      </div>

      <div style={{ position:"relative", marginBottom:6 }}>
        <div style={{
          display:"flex", height:30, borderRadius:5,
          overflow:"hidden", border:"1px solid #141414",
        }}>
          {DASHA.map((d, i) => {
            const w = (d.yrs / FULL_SPAN) * 100;
            return (
              <div key={d.name} style={{
                width:`${w}%`,
                background: d.current
                  ? `linear-gradient(135deg, ${d.col}25, ${d.col}12)`
                  : "transparent",
                borderRight: i < DASHA.length-1 ? "1px solid #141414" : "none",
                position:"relative",
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, overflow:"hidden",
              }}>
                {d.current && (
                  <div style={{
                    position:"absolute", top:0, bottom:0, left:0,
                    width:"35%",
                    background:`linear-gradient(90deg, transparent, ${d.col}25, transparent)`,
                    animation:"shimmerBar 3.5s ease-in-out infinite",
                  }}/>
                )}
                <span style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize: d.yrs >= 16 ? 8 : 7,
                  color: d.current ? d.col : "#2E2416",
                  letterSpacing:"0.06em",
                  fontWeight: d.current ? "600" : "400",
                  position:"relative", zIndex:1,
                }}>
                  {d.yrs >= 12 ? d.name : d.name.slice(0,2)}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{
          position:"absolute",
          left:`${NOW_PCT}%`,
          top:-5, bottom:-5, width:1,
          background:"var(--gold)",
          animation:"needlePulse 2s ease-in-out infinite",
          zIndex:10,
        }}>
          <div style={{
            position:"absolute", top:-17, left:"50%",
            transform:"translateX(-50%)",
            fontFamily:"'Cinzel',serif", fontSize:7.5,
            color:"var(--gold)", whiteSpace:"nowrap",
            letterSpacing:"0.1em",
          }}>{NOW}</div>
        </div>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
        {DASHA.map(d => (
          <span key={d.start} style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:9, color:"#2A1E0F", fontStyle:"italic",
          }}>{d.start}</span>
        ))}
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:9, color:"#2A1E0F", fontStyle:"italic" }}>
          {DASHA[DASHA.length-1].end}
        </span>
      </div>

      <div style={{
        padding:"12px 14px",
        background:"rgba(232,192,80,0.035)",
        border:"1px solid #201808",
        borderRadius:9,
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:"#7A6B40", fontStyle:"italic" }}>
            Jupiter · 16-year sovereignty window
          </span>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:9, color:"#E8C050", letterSpacing:"0.1em" }}>
            {JUP_PROGRESS}% elapsed
          </span>
        </div>
        <div style={{ height:3, background:"#111", borderRadius:2, overflow:"hidden", marginBottom:10 }}>
          <div style={{
            height:"100%", width:`${JUP_PROGRESS}%`,
            background:"linear-gradient(90deg, #7A5A1E, #E8C050)",
            borderRadius:2,
            animation:"barIn 1.2s ease both",
          }}/>
        </div>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:"#3A2E18", fontStyle:"italic", lineHeight:1.6 }}>
          Peak window for institutional expansion, philosophical mastery,
          and long-arc legacy construction. Opportunities front-load in the second quadrant.
        </p>
      </div>
    </div>
  );
}

// ─── YOGA INSIGHTS ────────────────────────────────────────────────────────────
function YogaInsights() {
  const [expanded, setExpanded] = useState(0);
  const planetSym = name => PLANETS.find(p => p.name === name)?.sym || "";

  return (
    <div style={{ padding:"20px 22px", height:"100%", display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:"0.25em", color:"#4A3820", textTransform:"uppercase", marginBottom:3 }}>
            Yoga Scan
          </div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, color:"var(--gold)" }}>
            5 Active Formations
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:3 }}>
          {YOGAS.map(y => (
            <div key={y.name} style={{
              width:4,
              height: 4 + Math.round((y.str - 80) / 3),
              background:`rgba(197,160,89,${0.2 + (y.str-80)/80})`,
              borderRadius:1,
            }}/>
          ))}
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:7, paddingRight:2 }}>
        {YOGAS.map((y, i) => (
          <div
            key={y.name}
            onClick={() => setExpanded(expanded === i ? -1 : i)}
            style={{
              padding:"11px 13px",
              background: expanded===i ? "rgba(197,160,89,0.04)" : "transparent",
              border:`1px solid ${expanded===i ? "#201808" : "#0F0F0F"}`,
              borderRadius:10,
              cursor:"pointer",
              transition:"all 0.25s",
              animation:"fadeUp 0.5s ease both",
              animationDelay:`${i * 0.07}s`,
              flexShrink:0,
            }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{
                width:30, height:30, borderRadius:"50%",
                background:`${y.col}14`,
                border:`1px solid ${y.col}28`,
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0,
              }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:y.col }}>
                  {planetSym(y.planet)}
                </span>
              </div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:10, color:"var(--gold)", letterSpacing:"0.04em" }}>
                    {y.name}
                  </div>
                  <div style={{
                    fontFamily:"'Cinzel',serif", fontSize:9, color:y.col,
                    letterSpacing:"0.1em", flexShrink:0, marginLeft:8,
                  }}>{y.str}</div>
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:9.5, color:"#3A2E18", fontStyle:"italic", marginTop:1 }}>
                  {y.sans}
                </div>
              </div>

              <div style={{
                width:14, height:14, flexShrink:0, display:"flex",
                alignItems:"center", justifyContent:"center",
                color:"#3A2E18", fontSize:10,
                transform: expanded===i ? "rotate(180deg)" : "rotate(0deg)",
                transition:"transform 0.25s",
              }}>▾</div>
            </div>

            {expanded === i && (
              <div style={{ marginTop:11, paddingLeft:40, animation:"fadeUp 0.2s ease both" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:"#6A5A3C", lineHeight:1.65, marginBottom:10 }}>
                  {y.desc}
                </p>
                <div style={{
                  padding:"9px 11px",
                  background:`${y.col}07`,
                  borderLeft:`2px solid ${y.col}35`,
                  borderRadius:"0 7px 7px 0",
                }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:7, color:y.col, letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:4 }}>
                    Strategic Insight
                  </div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11.5, color:"#8A7050", lineHeight:1.6, fontStyle:"italic" }}>
                    {y.insight}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PLANETARY DIGNITIES ──────────────────────────────────────────────────────
function PlanetDignities() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 400); return () => clearTimeout(t); }, []);

  const dignityColor = d => ({
    "Exalted":"#E8C050", "Own Sign":"#E8A830", "Friend":"#60C870",
    "Neutral":"#6A6A88", "Enemy":"#C84840", "Debilitated":"#8A3030"
  }[d] || "#6A6A88");

  const sorted = [...PLANETS].sort((a,b) => b.str - a.str);

  return (
    <div style={{ padding:"20px 22px", height:"100%" }}>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:"0.25em", color:"#4A3820", textTransform:"uppercase", marginBottom:3 }}>
        Planetary Dignities
      </div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, color:"var(--gold)", marginBottom:18, letterSpacing:"0.04em" }}>
        Graha Bala
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
        {sorted.map((p, i) => (
          <div key={p.name} style={{
            display:"flex", alignItems:"center", gap:10,
            animation:"fadeUp 0.5s ease both",
            animationDelay:`${i * 0.05}s`,
          }}>
            <div style={{
              width:20, textAlign:"center",
              fontFamily:"'Cinzel',serif", fontSize:9,
              color:p.col, letterSpacing:"0.05em", flexShrink:0,
            }}>{p.abbr}</div>

            <div style={{ flex:1, height:3.5, background:"#0F0F0F", borderRadius:2, overflow:"hidden" }}>
              <div style={{
                height:"100%",
                width: loaded ? `${p.str}%` : "0%",
                background:`linear-gradient(90deg, ${p.col}60, ${p.col})`,
                borderRadius:2,
                transition:`width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
              }}/>
            </div>

            <div style={{
              width:54, fontFamily:"'Cormorant Garamond',serif", fontSize:10,
              color:dignityColor(p.dignity), fontStyle:"italic", flexShrink:0,
            }}>{p.dignity}</div>

            <div style={{
              width:22, textAlign:"right",
              fontFamily:"'Cinzel',serif", fontSize:8,
              color:"#2E2416", letterSpacing:"0.05em", flexShrink:0,
            }}>{p.str}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NAKSHATRA CARD ───────────────────────────────────────────────────────────
function NakshatraCard() {
  const nakshatras = [
    { label:"Moon",   val:"Śravaṇa",         sub:"Capricorn · 23° 14′", note:"Fame, divine listening" },
    { label:"Lagna",  val:"Aśvinī",           sub:"Aries · 23° 00′",    note:"Swiftness, healing" },
    { label:"Sun",    val:"Pūrva Phālgunī",   sub:"Leo · 15° 42′",      note:"Luxury, patronage" },
  ];

  return (
    <div style={{ padding:"20px 22px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
      <div>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:"0.25em", color:"#4A3820", textTransform:"uppercase", marginBottom:3 }}>Timing</div>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, color:"var(--gold)", marginBottom:18 }}>Nakshatra</div>

        <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
          {nakshatras.map(n => (
            <div key={n.label}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:7.5, color:"#2E2416", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:2 }}>
                {n.label}
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:"var(--text)" }}>
                {n.val}
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:9.5, color:"#3A2E18", fontStyle:"italic" }}>
                {n.sub} · {n.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding:"9px 11px",
        background:"rgba(197,160,89,0.03)",
        border:"1px solid #141414",
        borderRadius:7,
        marginTop:14,
      }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:10.5, color:"#4A3820", fontStyle:"italic", lineHeight:1.55 }}>
          Jupiter transiting natal Moon activates Śravaṇa's fame-axis. Peak resonance window approaching.
        </p>
      </div>
    </div>
  );
}

// ─── CTA CARD ─────────────────────────────────────────────────────────────────
function CTACard() {
  const [hov, setHov] = useState(false);

  const features = [
    "Yoga strength matrix & timing overlays",
    "10-year dasha forecast with sub-periods",
    "Transit windows for all 9 grahas",
    "Strategic action calendar (D1 + D9)",
  ];

  return (
    <div style={{ padding:"22px 22px 20px", height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
      <div>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:"0.25em", color:"#4A3820", textTransform:"uppercase", marginBottom:3 }}>
          Strategic Report
        </div>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:14, color:"var(--gold)", marginBottom:10 }}>
          High-Status Blueprint
        </div>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:"#5A4A2C", lineHeight:1.6, fontStyle:"italic", marginBottom:14 }}>
          A precision-crafted sovereign document — every yoga quantified, every window identified, every advantage mapped.
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
          {features.map(f => (
            <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:9 }}>
              <div style={{ width:4, height:4, borderRadius:"50%", background:"var(--gold)", flexShrink:0, marginTop:4 }}/>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:"#3A2E18", fontStyle:"italic", lineHeight:1.4 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          marginTop:18,
          width:"100%",
          padding:"13px 0",
          background: hov
            ? "linear-gradient(135deg, #E8C87A, #D4AA60)"
            : "linear-gradient(135deg, #C5A059, #9B7A3E)",
          border:"none",
          borderRadius:8,
          cursor:"pointer",
          fontFamily:"'Cinzel',serif",
          fontSize:9,
          letterSpacing:"0.22em",
          color:"#030303",
          fontWeight:"700",
          textTransform:"uppercase",
          transition:"all 0.3s",
          boxShadow: hov ? "0 4px 24px rgba(197,160,89,0.28), 0 0 40px rgba(197,160,89,0.12)" : "none",
          position:"relative", overflow:"hidden",
        }}
      >
        {hov && (
          <div style={{
            position:"absolute", top:0, bottom:0, left:0,
            width:"40%",
            background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            animation:"shimmerBar 1s ease infinite",
          }}/>
        )}
        Export High-Status Blueprint
      </button>
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
export default function AetherVedic() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="aether">

        {/* Header */}
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          marginBottom:16, paddingBottom:14,
          borderBottom:"1px solid #0E0E0E",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:18 }}>
            <div>
              <div style={{
                fontFamily:"'Cinzel',serif",
                fontSize:24, fontWeight:700,
                letterSpacing:"0.4em",
                color:"var(--gold)",
                lineHeight:1,
              }}>AETHER</div>
              <div style={{
                fontFamily:"'Cormorant Garamond',serif",
                fontSize:9.5, letterSpacing:"0.35em",
                color:"#2E2416", fontStyle:"italic",
                marginTop:3,
              }}>VEDIC INTELLIGENCE SYSTEM</div>
            </div>
            <div style={{ width:1, height:32, background:"#111" }}/>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:"#2E2416", fontStyle:"italic" }}>
              Precision Astrology Dashboard
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:22 }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:"0.2em", color:"#1E1608", textTransform:"uppercase", marginBottom:2 }}>
                Active Chart
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:"#3A2E18", fontStyle:"italic" }}>
                Aries · Parashari · D1
              </div>
            </div>
            <DigitalClock />
          </div>
        </div>

        {/* Main Grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"5fr 7fr",
          gridTemplateRows:"auto auto",
          gap:12,
        }}>
          <div className="card" style={{ gridRow:"1 / 3", animationDelay:"0.08s" }}>
            <NorthIndianChart />
          </div>
          <div className="card" style={{ animationDelay:"0.14s" }}>
            <DashaTimeline />
          </div>
          <div className="card" style={{ animationDelay:"0.2s", minHeight:310 }}>
            <YogaInsights />
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"4fr 5fr 3fr",
          gap:12,
          marginTop:12,
        }}>
          <div className="card" style={{ animationDelay:"0.26s" }}>
            <PlanetDignities />
          </div>
          <div className="card" style={{ animationDelay:"0.32s" }}>
            <CTACard />
          </div>
          <div className="card" style={{ animationDelay:"0.38s" }}>
            <NakshatraCard />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop:16, paddingTop:12,
          borderTop:"1px solid #0A0A0A",
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:10, color:"#1E1608", fontStyle:"italic" }}>
            Aether · Vedic Intelligence · Parashari System · North Indian Format · © 2026
          </div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:7.5, letterSpacing:"0.2em", color:"#141008" }}>
            FOR PRIVATE USE ONLY
          </div>
        </div>

      </div>
    </>
  );
}
