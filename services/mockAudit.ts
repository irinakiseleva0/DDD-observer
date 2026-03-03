export function mockAuditLog(message: string, payload?: unknown) {
  console.log(`[MOCK AUDIT] ${message}`, payload ?? "")
}