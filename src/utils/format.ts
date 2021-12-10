export function format (time: string): string {
  const realTime = time.slice(0, time.length)
  const min = parseInt(realTime.split(':')[0]) * 60
  const sec = parseFloat(realTime.split(':')[1])
  return `[${((min + sec) * 1000).toFixed(3)}]`
}
