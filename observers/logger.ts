import { subscribe, EMITTER } from "../domain/events.js"
import { mockAuditLog } from "../services/mockAudit.js"

export function registerLogger() {
  subscribe((event) => {
    if (event.emitter !== EMITTER) return

    mockAuditLog(`EVENT: ${event.type}`, event)
  })
}