import { useEffect } from 'react';
import { SPR } from '../art/sprites.js';
import { Panel, Entry, Pub, SkillList, LanguageList } from './Card.jsx';
import { PERSON, EXPERIENCE, EDUCATION, PUBLICATIONS, INTERESTS, CHAPTERS, ITEMS } from '../data/story.js';

const CAP = (s) => s[0].toUpperCase() + s.slice(1);

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <Panel>
          <header className="modal-head">
            <h2>{title}</h2>
            <button className="btn" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </header>
          <div className="modal-body">{children}</div>
        </Panel>
      </div>
    </div>
  );
}

export function MapModal({ onClose, onJump }) {
  return (
    <Modal title="Map" onClose={onClose}>
      <p className="aside">Jump straight to a part of the story.</p>
      <ol className="map-list">
        {CHAPTERS.map((c) => (
          <li key={c.label}>
            <button onClick={() => onJump(c.x)}>
              <img className="px" src={SPR[`icon${CAP(c.season)}`].url} alt="" />
              <span>
                <b>{c.label}</b>
                <small>{c.sub}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </Modal>
  );
}

const KINDS = [
  ['skill', 'Skills'],
  ['language', 'Languages'],
  ['milestone', 'Milestones'],
];

export function BagModal({ onClose, collected }) {
  return (
    <Modal title={`Backpack · ${collected.size} of ${ITEMS.length}`} onClose={onClose}>
      <p className="aside">Everything picked up along the way. Keep walking to fill the gaps.</p>
      {KINDS.map(([kind, label]) => (
        <section key={kind}>
          <h3>{label}</h3>
          <p className="chips bag">
            {ITEMS.filter((i) => i.kind === kind).map((i) => (
              <span key={i.id} className={collected.has(i.id) ? `have ${kind}` : 'missing'}>
                {collected.has(i.id) ? i.label : '? ? ?'}
              </span>
            ))}
          </p>
        </section>
      ))}
    </Modal>
  );
}

export function CvModal({ onClose }) {
  return (
    <Modal title={PERSON.name} onClose={onClose}>
      <div className="cv">
        <p className="org">
          {PERSON.role} · {PERSON.location}
        </p>
        <p>{PERSON.profile}</p>
        <p className="actions">
          <a className="btn primary" href={`mailto:${PERSON.email}`}>
            {PERSON.email}
          </a>
        </p>

        <h3>Professional experience</h3>
        {EXPERIENCE.map((e) => (
          <article key={e.id}>
            <Entry entry={e} label="" />
          </article>
        ))}

        <h3>Education</h3>
        {EDUCATION.map((e) => (
          <article key={e.id}>
            <Entry entry={e} label="" />
          </article>
        ))}

        <h3>Publications</h3>
        <p className="aside">Published under my maiden name, Szwoch.</p>
        {[...PUBLICATIONS].reverse().map((p) => (
          <article key={p.id}>
            <Pub pub={p} />
          </article>
        ))}

        <h3>Programming skills</h3>
        <SkillList />

        <h3>Languages</h3>
        <LanguageList />

        <h3>Interests</h3>
        <p>{INTERESTS.join(' · ')}</p>
      </div>
    </Modal>
  );
}
