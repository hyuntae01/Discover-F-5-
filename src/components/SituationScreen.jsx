import { SITUATIONS } from '../data/presets'
import { TopBar } from './ui'

export default function SituationScreen({ onPick, onBack, onHome }) {
  return (
    <div className="screen">
      <TopBar onBack={onBack} onHome={onHome} />
      <div className="panel">
        <h2 className="panel__title">
          이런 상황에는
          <br />
          어떻게 말하지?
        </h2>
        <div className="situations">
          {SITUATIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`situation${s.wide ? ' situation--wide' : ''}`}
              onClick={() => onPick(s.name)}
            >
              <span className="situation__icon" aria-hidden="true">
                {s.icon}
              </span>
              <span className="situation__name">{s.name}</span>
              <span className="situation__desc">{s.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
