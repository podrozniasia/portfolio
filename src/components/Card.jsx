import { memo } from 'react';
import { SPR } from '../art/sprites.js';
import { PERSON, SKILLS, OTHER_SKILLS, LANGUAGES, STATS, INTERESTS, PUBLICATIONS, ITEMS } from '../data/story.js';

const CAP = (s) => s[0].toUpperCase() + s.slice(1);

function Panel({ className = '', children }) {
  return (
    <div className={`panel ${className}`}>
      <div className="panel-in">{children}</div>
    </div>
  );
}

function Ext({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export function Entry({ entry, label, aside }) {
  return (
    <>
      <p className="eyebrow">
        {label}
        {entry.current && <b className="badge now">current</b>}
      </p>
      <h2>{entry.title}</h2>
      <p className="org">{entry.url ? <Ext href={entry.url}>{entry.org}</Ext> : entry.org}</p>
      <p className="meta">
        {entry.dates} · {entry.place}
      </p>
      <ul>
        {entry.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      {entry.tags && (
        <p className="chips">
          {entry.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
      )}
      {aside && <p className="aside">{aside}</p>}
    </>
  );
}

export function Pub({ pub, n }) {
  return (
    <>
      <p className="eyebrow">
        Publication{n ? ` ${n} of ${PUBLICATIONS.length}` : ''}
        {pub.award && <b className="badge gold">{pub.award}</b>}
      </p>
      <h2 className="small">{pub.title}</h2>
      <p className="meta">
        {pub.date} · {pub.venue}
      </p>
      <p className="authors">{pub.authors}</p>
      {pub.url && (
        <p>
          <Ext href={pub.url}>Read the paper ↗</Ext>
        </p>
      )}
    </>
  );
}

export function SkillList() {
  return (
    <>
      <dl className="skills">
        {SKILLS.map((s) => (
          <div key={s.name}>
            <dt>{s.name}</dt>
            <dd>{s.detail}</dd>
          </div>
        ))}
      </dl>
      <p className="chips">
        {OTHER_SKILLS.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </p>
    </>
  );
}

export function LanguageList() {
  return (
    <ul className="langs">
      {LANGUAGES.map((l) => (
        <li key={l.name}>
          <span className="lang-name">{l.name}</span>
          <span className="bar" aria-label={`${l.level} of 5`}>
            {[1, 2, 3, 4, 5].map((i) => (
              <i key={i} className={i <= l.level ? 'on' : ''} />
            ))}
          </span>
          <span className="lang-detail">{l.detail}</span>
        </li>
      ))}
    </ul>
  );
}

function Body({ st, collectedCount, onOpen }) {
  switch (st.kind) {
    case 'intro':
      return (
        <>
          <p className="eyebrow">Hello! I’m</p>
          <h1>{PERSON.name}</h1>
          <p className="org">
            {PERSON.tagline} · {PERSON.location}
          </p>
          <p>I grow insights from data, from seed to harvest. Walk with me through the seasons of my career.</p>
          <p className="hint">
            <span className="bounce">▼</span> Scroll or swipe up to walk
            <span className="keys"> · or hold →</span>
          </p>
        </>
      );
    case 'chapter':
      return (
        <>
          <p className="chapter-title">
            <img className="px" src={SPR[`icon${CAP(st.season)}`].url} alt="" />
            {st.title}
          </p>
          <p className="chapter-sub">{st.sub}</p>
          <p>{st.text}</p>
        </>
      );
    case 'note':
      return (
        <>
          <p className="eyebrow">{st.title}</p>
          <p>{st.text}</p>
        </>
      );
    case 'entry':
      return <Entry entry={st.entry} label={st.label} aside={st.aside} />;
    case 'pub':
      return (
        <>
          <Pub pub={st.pub} n={st.n} />
          <p className="aside">Published under my maiden name, Szwoch.</p>
        </>
      );
    case 'skills':
      return (
        <>
          <p className="eyebrow">The toolshed</p>
          <h2>Tools I work with</h2>
          <SkillList />
        </>
      );
    case 'languages':
      return (
        <>
          <p className="eyebrow">The language garden</p>
          <h2>Six languages</h2>
          <LanguageList />
        </>
      );
    case 'finale':
      return (
        <>
          <p className="eyebrow">Harvest report</p>
          <h2>Thank you for walking with me</h2>
          <div className="stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <b>{s.n}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <p>
            Looking for someone to grow insights from your data? I would love to hear about your field.
          </p>
          <p className="actions">
            <a className="btn primary" href={`mailto:${PERSON.email}`}>
              Write to me
            </a>
            <button className="btn" onClick={() => onOpen('cv')}>
              Read the full CV
            </button>
            <Ext href={PERSON.github}>GitHub ↗</Ext>
          </p>
          <p className="aside">
            Off the farm: {INTERESTS.join(', ').toLowerCase()}. You gathered {collectedCount} of {ITEMS.length} items.
          </p>
        </>
      );
    default:
      return null;
  }
}

export default memo(function Card({ st, collectedCount, onOpen }) {
  if (!st) return null;
  return (
    <div className="card-slot" key={st.id}>
      <Panel className={`card k-${st.kind} ${st.season ? `season-${st.season}` : ''}`}>
        <Body st={st} collectedCount={collectedCount} onOpen={onOpen} />
      </Panel>
    </div>
  );
});

export { Panel };
