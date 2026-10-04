import { useEffect, useRef, useState } from 'react'
import HomeScreen from './components/HomeScreen'
import InputScreen from './components/InputScreen'
import ResultScreen from './components/ResultScreen'
import SituationScreen from './components/SituationScreen'
import { DEFAULT_FIELDS } from './data/presets'
import { convert, fieldsFromPreset } from './lib/convert'

const COPY_FEEDBACK_MS = 1500
const CONVERT_MS = 450

export default function App() {
  const [screen, setScreen] = useState('home')
  const [fields, setFields] = useState(DEFAULT_FIELDS)
  const [conversion, setConversion] = useState(null)
  const [source, setSource] = useState(DEFAULT_FIELDS)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
    return id
  }

  const go = (next) => {
    setScreen(next)
    window.scrollTo({ top: 0 })
  }

  const update = (patch) => setFields((prev) => ({ ...prev, ...patch }))

  // SC-01 → SC-02: 빈 입력 상태로 초기화
  const startFresh = () => {
    setFields(DEFAULT_FIELDS)
    go('input')
  }

  // SC-04 → SC-02: 예문과 옵션 3종을 한 번에 덮어쓴다
  const pickSituation = (name) => {
    setFields(fieldsFromPreset(name))
    go('input')
  }

  // SC-02 → SC-03
  const runConvert = () => {
    if (!fields.text.trim() || loading) return
    setLoading(true)
    later(() => {
      setSource(fields)
      setConversion(convert(fields))
      setLoading(false)
      setCopied(false)
      setCopyFailed(false)
      go('result')
    }, CONVERT_MS)
  }

  // SC-03 → SC-02: 입력값과 옵션을 그대로 유지한다
  const editAgain = () => go('input')

  const copy = async (text, node) => {
    setCopyFailed(false)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      later(() => setCopied(false), COPY_FEEDBACK_MS)
    } catch {
      if (node) {
        const range = document.createRange()
        range.selectNodeContents(node)
        const selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
      }
      setCopyFailed(true)
    }
  }

  const goHome = () => go('home')

  if (screen === 'home') {
    return (
      <HomeScreen onStart={startFresh} onSituations={() => go('situations')} />
    )
  }

  if (screen === 'situations') {
    return <SituationScreen onPick={pickSituation} onBack={goHome} onHome={goHome} />
  }

  if (screen === 'result') {
    return (
      <ResultScreen
        source={source}
        conversion={conversion}
        copied={copied}
        copyFailed={copyFailed}
        onCopy={copy}
        onEdit={editAgain}
        onSituations={() => go('situations')}
        onBack={editAgain}
        onHome={goHome}
      />
    )
  }

  return (
    <InputScreen
      fields={fields}
      onChange={update}
      onBack={goHome}
      onHome={goHome}
      onConvert={runConvert}
      loading={loading}
    />
  )
}
