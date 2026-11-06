export function buildConsultationUrl(calendarId: string | undefined, name: string, email: string) {
  const id = calendarId || 'therelonetwork/30min'
  const path = id.includes('/') ? id : `${id}/30min`
  const url = new URL(`https://cal.com/${path}`)
  url.searchParams.set('name', name)
  url.searchParams.set('email', email)
  return url.toString()
}
