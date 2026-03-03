import { subscribe } from "../domain/events"
import { mockRecalculateEta } from "../services/mockEta"

export function registerEtaCalculator() {
  subscribe((event) => {
    if (event.type === "OrderCreated") {
      mockRecalculateEta(event.orderId)
    }
  })
}