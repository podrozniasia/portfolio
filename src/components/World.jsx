import { memo, useMemo } from 'react';
import { SPR } from '../art/sprites.js';
import { rnd } from '../art/pixel.js';
import {
  WORLD,
  GROUND,
  OBJECTS,
  SIGNS,
  FAR,
  ITEMS,
  BOAT_ZONES,
  FLIGHT_ZONES,
  SEASONS,
} from '../data/story.js';

// n art pixels as a CSS length
export const u = (n) => `calc(var(--s) * ${n})`;
const onGround = (y = 0) => `calc(var(--g) + var(--s) * ${y - 2})`;

function Sprite({ sp, x = 0, y = 0, className = '', style, innerRef }) {
  const s = SPR[sp];
  return (
    <img
      ref={innerRef}
      className={`spr ${className}`}
      src={s.url}
      alt=""
      draggable={false}
      style={{ left: u(x), bottom: onGround(y), width: u(s.w), height: u(s.h), ...style }}
    />
  );
}

const CAP = (s) => s[0].toUpperCase() + s.slice(1);

/* ---------- sky, sun, mountains, hills ---------- */

export const Backdrop = memo(function Backdrop({ R, anchorArt, vwArt }) {
  const stars = useMemo(() => {
    const r = rnd(42);
    return Array.from({ length: 46 }, () => `${Math.round(r() * 100)}vw ${Math.round(r() * 55)}vh 0 ${r() > 0.8 ? 1 : 0}px #fff6d6`).join(',');
  }, []);
  const clouds = useMemo(() => {
    const r = rnd(8);
    const n = Math.ceil((WORLD.width * 0.08 + vwArt) / 70) + 1;
    return Array.from({ length: n }, (_, i) => ({ x: i * 70 + Math.round(r() * 30), y: Math.round(r() * 100), k: r() > 0.5 }));
  }, [vwArt]);

  return (
    <>
      <div className="skies">
        {SEASONS.map((s) => (
          <div key={s} ref={R(`sky-${s}`)} className={`sky sky-${s}`} />
        ))}
      </div>
      <div ref={R('stars')} className="stars" style={{ boxShadow: stars }} />
      <img ref={R('sun')} className="spr orb" src={SPR.sun.url} alt="" style={{ width: u(SPR.sun.w), height: u(SPR.sun.h) }} />
      <img ref={R('moon')} className="spr orb" src={SPR.moon.url} alt="" style={{ width: u(SPR.moon.w), height: u(SPR.moon.h) }} />

      <div
        ref={R('mountains')}
        className="bgtile mountains"
        style={{
          backgroundImage: `url(${SPR.mountains.url})`,
          backgroundSize: `${u(320)} ${u(96)}`,
          height: u(96),
          width: `calc(100% + ${u(320)})`,
          bottom: `calc(var(--g) + var(--s) * 18)`,
        }}
      />

      <div ref={R('clouds')} className="layer">
        {clouds.map((c, i) => (
          <img
            key={i}
            className={`spr cloud ${c.k ? 'slow' : ''}`}
            src={SPR.cloud.url}
            alt=""
            style={{ left: u(c.x), top: `calc(8% + ${u(c.y * 0.6)})`, width: u(SPR.cloud.w), height: u(SPR.cloud.h) }}
          />
        ))}
      </div>

      <div ref={R('far')} className="layer">
        {FAR.map((f, i) => {
          const s = SPR[f.sp];
          const left = f.x * 0.35 + anchorArt * 0.65 - s.w / 2;
          return <Sprite key={i} sp={f.sp} x={left} y={14} className="far" />;
        })}
      </div>

      <div ref={R('hills')} className="hills-mover" style={{ width: `calc(100% + ${u(256)})`, height: u(72), bottom: `calc(var(--g) - var(--s) * 2)` }}>
        {SEASONS.map((s) => (
          <div
            key={s}
            ref={R(`hills-${s}`)}
            className="bgtile hills"
            style={{ backgroundImage: `url(${SPR[`hills${CAP(s)}`].url})`, backgroundSize: `${u(256)} ${u(72)}` }}
          />
        ))}
      </div>
    </>
  );
});

/* ---------- the walkable strip ---------- */

export const Scenery = memo(function Scenery() {
  return (
    <>
      {GROUND.map((g, i) => (
        <div
          key={i}
          className={`ground ${g.kind === 'water' ? 'water' : ''}`}
          style={{
            left: u(g.from),
            width: u(g.to - g.from),
            backgroundImage: `url(${g.kind === 'water' ? SPR.water.url : SPR[`ground${g.kind}`].url})`,
          }}
        />
      ))}

      {OBJECTS.map((o, i) => (
        <Sprite key={i} sp={o.sp} x={o.x} y={o.y} />
      ))}

      {/* ETL pipe from the barrels to the data mart */}
      <div className="pipe" style={{ left: u(2172), width: u(64), bottom: onGround(6), backgroundImage: `url(${SPR.pipe.url})` }}>
        <div className="pipe-flow" style={{ backgroundImage: `url(${SPR.pipeFlow.url})` }} />
      </div>

      {/* windmill in the orange grove */}
      <Sprite sp="windmillBody" x={4290} />
      <Sprite sp="windmillBlades" x={4278} y={20} className="spin" />

      {/* evening lanterns */}
      {[4714, 4762, 4810].map((x) => (
        <Sprite key={x} sp="lanterns" x={x} y={44} className="glow" />
      ))}

      {SIGNS.map((s, i) => (
        <div
          key={i}
          className={`sign ${s.float ? 'float' : ''}`}
          style={{ left: u(s.x), bottom: s.float ? onGround(s.y) : `calc(var(--g) - var(--s) * 1)` }}
        >
          <span className="plank">{s.text}</span>
          {!s.float && <i className="post" style={{ height: u(s.y ?? 9) }} />}
        </div>
      ))}
    </>
  );
});

export const Tokens = memo(function Tokens({ collected }) {
  return ITEMS.map((it) => (
    <div
      key={it.id}
      className={`token ${it.kind} ${collected.has(it.id) ? 'got' : ''}`}
      style={{ left: u(it.x), bottom: it.sky ? `calc(var(--g) + var(--s) * (var(--lift) + 30))` : onGround(30) }}
    >
      <span>
        <img className="px" src={SPR.iconStar.url} alt="" />
        {it.label}
      </span>
    </div>
  ));
});

/* ---------- things that move ---------- */

export const Actors = memo(function Actors({ R, hat }) {
  return (
    <>
      {FLIGHT_ZONES.map((_, i) => (
        <Sprite key={`bl${i}`} innerRef={R(`balloon${i}`)} sp="balloon" y={11} className="actor" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <Sprite key={`ch${i}`} innerRef={R(`chick${i}`)} sp="chick" className="actor" />
      ))}
      <div ref={R('player')} className="player actor" style={{ width: u(16), height: u(22), bottom: onGround(0) }}>
        <div ref={R('playerFlip')} className="player-flip">
          <img ref={R('playerImg')} className="px" src={SPR.playerIdle.url} alt="Joanna" draggable={false} />
          <img
            className={`px hat ${hat}`}
            src={hat === 'grad' ? SPR.gradCap.url : SPR.strawHat.url}
            alt=""
            draggable={false}
            style={
              hat === 'grad'
                ? { width: u(SPR.gradCap.w), height: u(SPR.gradCap.h), top: u(-2) }
                : { width: u(SPR.strawHat.w), height: u(SPR.strawHat.h), top: u(-1) }
            }
          />
        </div>
      </div>
      {BOAT_ZONES.map((_, i) => (
        <Sprite key={`bo${i}`} innerRef={R(`boat${i}`)} sp="boat" y={-12} className="actor" />
      ))}
      {FLIGHT_ZONES.map((_, i) => (
        <Sprite key={`bk${i}`} innerRef={R(`basket${i}`)} sp="basket" y={-1} className="actor" />
      ))}
    </>
  );
});

/* ---------- weather ---------- */

const FX = {
  spring: { n: 14, cls: 'petal' },
  summer: { n: 0 },
  autumn: { n: 16, cls: 'leaf' },
  winter: { n: 44, cls: 'snow' },
  dusk: { n: 14, cls: 'firefly' },
};

export const Weather = memo(function Weather({ R }) {
  const groups = useMemo(() => {
    const r = rnd(99);
    return SEASONS.map((s) => ({
      s,
      bits: Array.from({ length: FX[s].n }, () => ({
        left: `${Math.round(r() * 110 - 5)}%`,
        top: `${Math.round(r() * 70)}%`,
        d: `${(5 + r() * 7).toFixed(1)}s`,
        delay: `${(-r() * 12).toFixed(1)}s`,
        dx: `${Math.round(r() * 120 - 20)}px`,
        z: r() > 0.6 ? 2 : 1,
      })),
    }));
  }, []);
  return groups.map((g) => (
    <div key={g.s} ref={R(`fx-${g.s}`)} className={`fx fx-${g.s}`}>
      {g.bits.map((b, i) => (
        <i
          key={i}
          className={FX[g.s].cls}
          style={{ left: b.left, '--top': b.top, '--d': b.d, '--delay': b.delay, '--dx': b.dx, '--z': b.z }}
        />
      ))}
    </div>
  ));
});
