import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SPR } from './art/sprites.js';
import { Backdrop, Scenery, Tokens, Actors, Weather, u } from './components/World.jsx';
import Card from './components/Card.jsx';
import { MapModal, BagModal, CvModal } from './components/Modals.jsx';
import {
  WORLD,
  SCROLL_K,
  GROUND_H,
  STATIONS,
  TIMELINE,
  ITEMS,
  BOAT_ZONES,
  FLIGHT_ZONES,
  PHD_X,
  CHICKS,
  SEASONS,
  SKY_KEYS,
} from './data/story.js';

const TRACK = (WORLD.end - WORLD.start) * SCROLL_K; // scrollable distance in CSS px
const AUTO_SPEED = 300; // CSS px of scroll per second
const KEY_SPEED = 620;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (t) => t * t * (3 - 2 * t);
const CAP = (s) => s[0].toUpperCase() + s.slice(1);

function calcView() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // size of one art pixel on screen
  const s = Math.max(2, Math.floor(Math.min(vw / 120, vh / 190)));
  return { vw, vh, s };
}

function seasonBlend(x) {
  for (let i = 0; i < SKY_KEYS.length - 1; i++) {
    const [x0, s0] = SKY_KEYS[i];
    const [x1, s1] = SKY_KEYS[i + 1];
    if (x <= x1 || i === SKY_KEYS.length - 2) return { a: s0, b: s1, t: clamp((x - x0) / (x1 - x0), 0, 1) };
  }
  return { a: 0, b: 0, t: 0 };
}

const stationAt = (x) => STATIONS.find((s) => x >= s.from && x <= s.to) || null;
const timelineAt = (x) => {
  let idx = 0;
  for (let i = 0; i < TIMELINE.length; i++) if (x >= TIMELINE[i].from) idx = i;
  return idx;
};

export default function App() {
  const [view, setView] = useState(calcView);
  const [activeId, setActiveId] = useState('intro');
  const [tl, setTl] = useState(0);
  const [collected, setCollected] = useState(() => new Set());
  const [hat, setHat] = useState('straw');
  const [modal, setModal] = useState(null);
  const [auto, setAuto] = useState(false);
  const [toasts, setToasts] = useState([]);

  const refs = useRef({});
  const refFns = useRef(new Map());
  const R = useCallback((name) => {
    let f = refFns.current.get(name);
    if (!f) {
      f = (el) => {
        refs.current[name] = el;
      };
      refFns.current.set(name, f);
    }
    return f;
  }, []);

  // simulation state that changes every frame lives outside React
  const sim = useRef({
    x: WORLD.start,
    dir: 1,
    acc: 0,
    keyDir: 0,
    auto: false,
    snap: true,
    frame: '',
    blend: '',
    activeId: 'intro',
    tl: 0,
    hat: 'straw',
    got: new Set(),
    chicks: [0, 1, 2, 3, 4].map((i) => ({ x: CHICKS.home + i * 9, dir: 1 })),
  });

  const anchor = view.vw * (view.vw < 720 ? 0.42 : 0.36);
  const anchorArt = anchor / view.s;
  const vwArt = view.vw / view.s;
  const lift = Math.round(clamp((view.vh / view.s - GROUND_H - 96) * 0.36, 12, 48));

  useEffect(() => {
    const onResize = () => setView(calcView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const stopAuto = useCallback(() => {
    if (sim.current.auto) {
      sim.current.auto = false;
      setAuto(false);
    }
  }, []);

  const toggleAuto = useCallback(() => {
    const next = !sim.current.auto;
    sim.current.auto = next;
    setAuto(next);
  }, []);

  // keyboard walking, and anything manual cancels auto-walk
  useEffect(() => {
    const fwd = ['ArrowRight', 'ArrowDown', 'd', 'D', ' ', 'PageDown'];
    const back = ['ArrowLeft', 'ArrowUp', 'a', 'A', 'PageUp'];
    const isField = (e) => /^(INPUT|TEXTAREA|BUTTON|A)$/.test(e.target.tagName);
    const down = (e) => {
      if (document.body.style.overflow === 'hidden') return; // a modal is open
      if (e.key === ' ' && isField(e)) return;
      const dir = fwd.includes(e.key) ? 1 : back.includes(e.key) ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      stopAuto();
      sim.current.keyDir = dir;
      // a quick tap still takes a step; holding the key walks continuously
      if (!e.repeat) sim.current.acc += dir * 50;
    };
    const up = (e) => {
      if (fwd.includes(e.key) || back.includes(e.key)) sim.current.keyDir = 0;
    };
    const blur = () => {
      sim.current.keyDir = 0;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);
    window.addEventListener('wheel', stopAuto, { passive: true });
    window.addEventListener('touchstart', stopAuto, { passive: true });
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
      window.removeEventListener('wheel', stopAuto);
      window.removeEventListener('touchstart', stopAuto);
    };
  }, [stopAuto]);

  const collect = useCallback((item) => {
    setCollected((prev) => {
      const next = new Set(prev);
      next.add(item.id);
      return next;
    });
    const key = `${item.id}-${Date.now()}`;
    setToasts((t) => [...t.slice(-2), { key, label: item.label, kind: item.kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), 1800);
  }, []);

  // the game loop
  useEffect(() => {
    const st = sim.current;
    const el = refs.current;
    const S = view.s;
    const maxCam = Math.max(0, WORLD.width * S - view.vw);
    let raf;
    let last = performance.now();

    const move = (node, x, y = 0, extra = '') => {
      if (node) node.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)${extra}`;
    };

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      // keyboard / auto-walk drive the real page scroll, so everything stays in sync
      const drive = st.auto ? AUTO_SPEED : st.keyDir * KEY_SPEED;
      st.acc += drive * dt;
      const whole = Math.trunc(st.acc);
      if (whole) {
        window.scrollBy(0, whole);
        st.acc -= whole;
      }

      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = clamp(window.scrollY / max, 0, 1);
      const target = WORLD.start + p * (WORLD.end - WORLD.start);
      const prev = st.x;
      if (st.snap) {
        st.x = target;
        st.snap = false;
      } else {
        st.x += (target - st.x) * Math.min(1, dt * 10);
        if (Math.abs(target - st.x) < 0.05) st.x = target;
      }
      const x = st.x;
      const v = x - prev;
      if (Math.abs(v) > 0.02) st.dir = v > 0 ? 1 : -1;
      const moving = Math.abs(v) > 0.04;
      if (st.auto && p >= 0.999) stopAuto();

      // vehicles
      let yOff = 0;
      let riding = false;
      BOAT_ZONES.forEach(([a, b], i) => {
        const bob = Math.sin(t * 2.2 + i) * 0.8;
        const bx = clamp(x, a + 24, b - 24);
        move(el[`boat${i}`], (bx - 24) * S, -bob * S);
        if (x > a + 6 && x < b - 6) {
          riding = true;
          yOff = -4 + bob;
        }
      });
      FLIGHT_ZONES.forEach(([a, b], i) => {
        const cx = clamp(x, a + 14, b - 14);
        const k = clamp(Math.min(cx - (a + 14), b - 14 - cx) / 70, 0, 1);
        const h = lift * smooth(k) + Math.sin(t * 1.6) * 1.2 * k;
        move(el[`balloon${i}`], (cx - 26) * S, -h * S);
        move(el[`basket${i}`], (cx - 10) * S, -h * S);
        if (x > a + 6 && x < b - 6) {
          riding = true;
          yOff = h;
        }
      });

      // player
      move(el.player, (x - 8) * S, -yOff * S);
      if (el.playerFlip) el.playerFlip.style.transform = `scaleX(${st.dir})`;
      const f = moving && !riding ? (Math.floor(x / 5) % 2 ? 'playerA' : 'playerB') : 'playerIdle';
      if (f !== st.frame && el.playerImg) {
        st.frame = f;
        el.playerImg.src = SPR[f].url;
      }

      // the followers
      const follow = x > CHICKS.from && x < CHICKS.to;
      st.chicks.forEach((c, i) => {
        const tgt = follow ? x - st.dir * (13 + i * 8) : CHICKS.home + i * 9;
        const pc = c.x;
        c.x += (tgt - c.x) * Math.min(1, dt * (7 - i));
        const cv = c.x - pc;
        if (Math.abs(cv) > 0.02) c.dir = cv > 0 ? 1 : -1;
        const hop = Math.abs(cv) > 0.03 ? Math.abs(Math.sin(t * 12 + i * 1.7)) * 2 : 0;
        move(el[`chick${i}`], (c.x - 5) * S, -hop * S, ` scaleX(${c.dir})`);
      });

      // camera and parallax
      const cam = clamp(x * S - anchor, 0, maxCam);
      move(el.world, -cam);
      move(el.far, -cam * 0.35);
      move(el.clouds, -cam * 0.08);
      move(el.hills, -((cam * 0.3) % (256 * S)));
      move(el.mountains, -((cam * 0.14) % (320 * S)));

      // seasons
      const bl = seasonBlend(x);
      const key = `${bl.a}-${bl.b}-${Math.round(bl.t * 40)}`;
      if (key !== st.blend) {
        st.blend = key;
        let dusk = 0;
        SEASONS.forEach((s, i) => {
          const w = bl.a === bl.b ? (i === bl.a ? 1 : 0) : i === bl.a ? 1 - bl.t : i === bl.b ? bl.t : 0;
          // the outgoing layer stays solid underneath while the next fades in on top
          const solid = i === bl.a ? 1 : i === bl.b ? bl.t : 0;
          for (const name of [`sky-${s}`, `hills-${s}`]) {
            const n = el[name];
            if (n) {
              n.style.opacity = solid;
              n.style.zIndex = i === bl.b && bl.a !== bl.b ? 2 : 1;
            }
          }
          const fx = el[`fx-${s}`];
          if (fx) {
            fx.style.opacity = w;
            fx.style.visibility = w > 0.01 ? 'visible' : 'hidden';
          }
          if (s === 'dusk') dusk = w;
        });
        if (el.stars) el.stars.style.opacity = dusk;
        if (el.moon) el.moon.style.opacity = dusk;
        if (el.sun) el.sun.style.opacity = 1 - dusk;
        if (el.tint) el.tint.style.opacity = dusk * 0.45;
      }
      const pd = clamp(x / 4700, 0, 1);
      move(el.sun, view.vw * (0.1 + 0.74 * pd), view.vh * (0.24 - 0.12 * Math.sin(Math.PI * pd)));
      if (el.progress) el.progress.style.transform = `scaleX(${p})`;

      // things React needs to know about (rare)
      const active = stationAt(x);
      const id = active ? active.id : null;
      if (id !== st.activeId) {
        st.activeId = id;
        setActiveId(id);
      }
      const ti = timelineAt(x);
      if (ti !== st.tl) {
        st.tl = ti;
        setTl(ti);
      }
      const h = x >= PHD_X ? 'grad' : 'straw';
      if (h !== st.hat) {
        st.hat = h;
        setHat(h);
      }
      const lo = Math.min(prev, x) - 8;
      const hi = Math.max(prev, x) + 8;
      if (hi - lo < 120) {
        for (const item of ITEMS) {
          if (item.x >= lo && item.x <= hi && !st.got.has(item.id)) {
            st.got.add(item.id);
            collect(item);
          }
        }
      }

      raf = requestAnimationFrame(frame);
    };
    st.blend = '';
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [view, anchor, lift, collect, stopAuto]);

  const jumpTo = useCallback((x) => {
    setModal(null);
    stopAuto();
    // wait for the modal to release the scroll lock
    requestAnimationFrame(() => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      sim.current.snap = true;
      window.scrollTo(0, ((x - WORLD.start) / (WORLD.end - WORLD.start)) * max);
    });
  }, [stopAuto]);

  const closeModal = useCallback(() => setModal(null), []);
  const station = useMemo(() => STATIONS.find((s) => s.id === activeId) || null, [activeId]);
  const time = TIMELINE[tl];

  return (
    <>
      <div
        className={`stage season-${time.season}`}
        onScroll={(e) => {
          // older browsers without overflow: clip can still be scrolled by focus
          e.currentTarget.scrollLeft = 0;
          e.currentTarget.scrollTop = 0;
        }}
        style={{ '--s': `${view.s}px`, '--lift': lift }}>
        <Backdrop R={R} anchorArt={anchorArt} vwArt={vwArt} />

        <div ref={R('world')} className="layer world" style={{ width: u(WORLD.width) }}>
          <Scenery />
          <Tokens collected={collected} />
          <Actors R={R} hat={hat} />
        </div>

        <div ref={R('tint')} className="tint" />
        <Weather R={R} />

        {/* heads-up display */}
        <div className="hud top">
          <div className="date" aria-live="polite">
            <img className="px" src={SPR[`icon${CAP(time.season)}`].url} alt="" />
            <span>
              <b>{time.when}</b>
              <small>{time.where}</small>
            </span>
          </div>
          <div className="hud-buttons">
            <button className="btn" onClick={() => setModal('map')}>
              Map
            </button>
            <button className="btn" onClick={() => setModal('cv')}>
              CV
            </button>
          </div>
        </div>

        <Card st={station} collectedCount={collected.size} onOpen={setModal} />

        <div className="toasts" aria-live="polite">
          {toasts.map((t) => (
            <div key={t.key} className={`toast ${t.kind}`}>
              <img className="px" src={SPR.iconStar.url} alt="" /> {t.label}
            </div>
          ))}
        </div>

        <div className="hud bottom">
          <button className="btn bag-btn" onClick={() => setModal('bag')} aria-label="Open backpack">
            <img className="px" src={SPR.iconBag.url} alt="" />
            <span>
              {collected.size}/{ITEMS.length}
            </span>
          </button>
          <div className="progress" aria-hidden="true">
            <i ref={R('progress')} />
          </div>
          <button className={`btn auto-btn ${auto ? 'on' : ''}`} onClick={toggleAuto} aria-pressed={auto}>
            {auto ? '❚❚ Pause' : '▶ Auto-walk'}
          </button>
        </div>
      </div>

      {/* the page is really just a tall strip: scrolling it walks the world */}
      <div className="track" style={{ height: `calc(100vh + ${TRACK}px)` }} aria-hidden="true" />

      {modal === 'map' && <MapModal onClose={closeModal} onJump={jumpTo} />}
      {modal === 'cv' && <CvModal onClose={closeModal} />}
      {modal === 'bag' && <BagModal onClose={closeModal} collected={collected} />}
    </>
  );
}
