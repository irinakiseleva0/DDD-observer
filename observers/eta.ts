import { subscribe } from "../domain/events.js"
import { mockRecalculateEta } from "../services/mockEta.js"

export function registerEtaCalculator() {
  subscribe((event) => {
    if (event.type === "OrderCreated") {
      mockRecalculateEta(event.orderId)
    }
  })
}