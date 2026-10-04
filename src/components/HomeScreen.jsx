import { useEffect, useState } from 'react'
import { HOME_SAMPLES } from '../data/presets'
import { Button, TopBar } from './ui'

const ROTATE_MS = 4000

export default function HomeScreen({ onStart, onSituations }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => setIndex((i) => (i + 1) % HOME_SAMPLES.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  const sample = HOME_SAMPLES[index]

  return (
    <div className="screen screen--home">
      <TopBar />
      <div className="home">
        <div className="home__copy">
          <h1 className="home__title">
            하고 싶은 말을,
            <br />
            <em>회사에서 할 수 있는 말로.</em>
          </h1>
          <p className="home__sub">
            상대방과 상황만 고르면, 원래 뜻은 그대로 두고
            <br />
            업무에 맞는 표현으로 바꿔 드려요.
          </p>
          <div className="home__actions">
            <Button onClick={onStart}>문장 바꾸러 가기</Button>
            <Button variant="secondary" onClick={onSituations}>
              상황별 표현 보기
            </Button>
          </div>
        </div>

        <div className="sample" aria-live="off">
          <span className="sample__cap">이렇게 바뀌어요</span>
          <p key={`b-${index}`} className="sample__before">
            {sample.before}
          </p>
          <span className="sample__arrow" aria-hidden="true">
            ↓
          </span>
          <p key={`a-${index}`} className="sample__after">
            {sample.after}
          </p>
          <div className="sample__dots" aria-hidden="true">
            {HOME_SAMPLES.map((_, i) => (
              <span key={i} className={i === index ? 'is-on' : ''} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
