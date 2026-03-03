export function mockSendEmail(to: string, subject: string, body: string) {
  console.log(`[MOCK EMAIL] to=${to} subject=${subject} body=${body}`)
  return { ok: true }
}