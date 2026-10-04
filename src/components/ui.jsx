export function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button type="button" className={`btn btn--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export function Chip({ selected, children, ...props }) {
  return (
    <button
      type="button"
      className={`chip${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      {...props}
    >
      {children}
    </button>
  )
}

// 세 그룹 모두 항상 1개가 선택된 상태를 유지한다. 해제 상태는 허용하지 않는다.
export function OptionGroup({ label, options, value, onChange }) {
  return (
    <div className="field">
      <span className="field__label" id={`label-${label}`}>
        {label}
      </span>
      <div className="chips" role="group" aria-labelledby={`label-${label}`}>
        {options.map((option) => (
          <Chip key={option} selected={value === option} onClick={() => onChange(option)}>
            {option}
          </Chip>
        ))}
      </div>
    </div>
  )
}

export function TopBar({ onBack, onHome }) {
  return (
    <header className={`topbar${onBack ? '' : ' topbar--brand-only'}`}>
      {onBack && (
        <button type="button" className="topbar__back" onClick={onBack}>
          <span aria-hidden="true">←</span> 뒤로
        </button>
      )}
      {onHome ? (
        <button type="button" className="topbar__brand" onClick={onHome}>
          OfficeTone
        </button>
      ) : (
        <span className="topbar__brand topbar__brand--static">OfficeTone</span>
      )}
    </header>
  )
}
