import { subscribe } from "../domain/events"
import { mockAuditLog } from "../services/mockAudit"

export function registerLogger() {
  subscribe((event) => {
    mockAuditLog(`EVENT: ${event.type}`, event)
  })
}