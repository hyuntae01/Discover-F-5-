import { MAX_LENGTH, OPTION_GROUPS } from '../data/presets'
import { Button, OptionGroup, TopBar } from './ui'

export default function InputScreen({ fields, onChange, onBack, onHome, onConvert, loading }) {
  const count = fields.text.length
  const empty = fields.text.trim().length === 0

  return (
    <div className="screen">
      <TopBar onBack={onBack} onHome={onHome} />
      <div className="panel">
        <div className="field">
          <label className="field__label" htmlFor="source">
            하고 싶은 말
          </label>
          <textarea
            id="source"
            className="textarea"
            value={fields.text}
            maxLength={MAX_LENGTH}
            rows={5}
            placeholder="바꾸고 싶은 문장을 그대로 적어 주세요."
            onChange={(e) => onChange({ text: e.target.value })}
          />
          <div className={`counter${count >= MAX_LENGTH - 10 ? ' is-warn' : ''}`}>
            {count}/{MAX_LENGTH}
          </div>
        </div>

        {OPTION_GROUPS.map((group) => (
          <OptionGroup
            key={group.key}
            label={group.label}
            options={group.options}
            value={fields[group.key]}
            onChange={(value) => onChange({ [group.key]: value })}
          />
        ))}

        <Button onClick={onConvert} disabled={empty || loading} className="btn--block">
          {loading ? '바꾸는 중…' : '회사 말투로 바꾸기'}
        </Button>
      </div>
    </div>
  )
}
