// dist/index.html(완성된 단일 HTML)에서 바깥 <html>/<head>/<body> 껍데기를 벗겨
// Claude 아티팩트로 그대로 게시할 수 있는 dist/artifact.html을 만든다.
import { readFileSync, writeFileSync } from 'node:fs'

const src = readFileSync('dist/index.html', 'utf8')
const head = src.match(/<head>([\s\S]*?)<\/head>/)[1]
const body = src.match(/<body>([\s\S]*?)<\/body>/)[1]
const keep = head
  .split('\n')
  .filter((line) => !/<meta\s+charset|<meta\s+name="viewport"/.test(line))
  .join('\n')

writeFileSync('dist/artifact.html', `${keep.trim()}\n${body.trim()}\n`)
console.log('dist/artifact.html 생성 완료')
