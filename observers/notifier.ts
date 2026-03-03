import { subscribe } from "../domain/events.js"
import { mockSendEmail } from "../services/mockEmail.js"

export function registerNotifier() {
  subscribe((event) => {
    if (event.type === "OrderCreated") {
      mockSendEmail(
        "customer@example.com",
        "Order created",
        `Order ${event.orderId} total=${event.total}`
      )
    }
  })
}