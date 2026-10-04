import { PRESETS } from '../data/presets'

const normalize = (s) => s.replace(/\s+/g, ' ').trim()

// 변환은 기획 확정 샘플 데이터로만 동작한다.
// 매칭되는 문장이 없으면 null을 돌려주고, SC-03이 "결과 없음" 상태를 보여준다.
export function convert({ text }) {
  const key = normalize(text)
  const hit = Object.values(PRESETS).find((p) => normalize(p.text) === key)
  if (!hit) return null
  return { result: hit.result, changes: hit.changes }
}

export const resultToPlainText = (result) => `${result.pre}${result.em}${result.post}`

export function fieldsFromPreset(name) {
  const p = PRESETS[name]
  return { text: p.text, target: p.target, tone: p.tone, channel: p.channel }
}
