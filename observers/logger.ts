import { subscribe } from "../domain/events.js"
import { mockAuditLog } from "../services/mockAudit.js"

export function registerLogger() {
  subscribe((event) => {
    mockAuditLog(`EVENT: ${event.type}`, event)
  })
}