import { useRef } from 'react'
import { resultToPlainText } from '../lib/convert'
import { Button, TopBar } from './ui'

export default function ResultScreen({
  source,
  conversion,
  copied,
  copyFailed,
  onCopy,
  onEdit,
  onSituations,
  onBack,
  onHome,
}) {
  const outputRef = useRef(null)

  // 결과 없음 — 샘플 데이터에 없는 문장. 설계서 SC-03 예외 상태.
  if (!conversion) {
    return (
      <div className="screen">
        <TopBar onBack={onBack} onHome={onHome} />
        <div className="panel">
          <h2 className="panel__title">변환할 수 없었어요</h2>
          <div className="card card--notice" role="status">
            샘플 데이터에 없는 문장이라 변환 결과를 보여드릴 수 없어요. 기본 예문을 그대로 쓰거나, 상황별
            표현에서 예문을 골라 주세요.
          </div>
          <div className="card">
            <span className="card__cap">기존 문장</span>
            <p className="card__text card__text--muted">{source.text}</p>
          </div>
          <div className="actions">
            <Button onClick={onEdit}>문장 수정하기</Button>
            <Button variant="secondary" onClick={onSituations}>
              상황별 표현에서 고르기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const { result, changes } = conversion

  return (
    <div className="screen">
      <TopBar onBack={onBack} onHome={onHome} />
      <div className="panel">
        <h2 className="panel__title">변환 완료</h2>

        <div className="card">
          <span className="card__cap">기존 문장</span>
          <p className="card__text card__text--muted">{source.text}</p>
        </div>

        <div className="card card--result">
          <span className="card__cap card__cap--accent">변환된 문장</span>
          <p className="card__text" ref={outputRef}>
            {result.pre}
            <strong>{result.em}</strong>
            {result.post}
          </p>
        </div>

        <div className="changes">
          <span className="card__cap">이렇게 바뀌었어요</span>
          <ul>
            {changes.map((change, i) => (
              <li key={i}>
                <span className="changes__mark" aria-hidden="true">
                  →
                </span>
                {Array.isArray(change) ? (
                  <span>
                    <span className="changes__from">{change[0]}</span> → {change[1]}
                  </span>
                ) : (
                  <span>{change}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="actions">
          <Button onClick={() => onCopy(resultToPlainText(result), outputRef.current)} className="btn--grow">
            {copied ? '복사했어요' : '복사하기'}
          </Button>
          <Button variant="secondary" onClick={onEdit}>
            문장 수정하기
          </Button>
        </div>
        {copyFailed && <p className="hint">복사가 막혀 있어요. 위 문장을 직접 복사해 주세요.</p>}
      </div>
    </div>
  )
}
