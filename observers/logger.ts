import { subscribe, EMITTER } from "../domain/events.js"
import { mockAuditLog } from "../services/mockAudit.js"

export function registerLogger() {
  subscribe((event) => {
    if (event.emitter !== EMITTER) return

    switch (event.type) {
      case "OrderCreated":
        mockAuditLog("Order created", event)
        break

      case "OrderRejected":
        mockAuditLog("Order rejected", event)
        break
    }
  })
}