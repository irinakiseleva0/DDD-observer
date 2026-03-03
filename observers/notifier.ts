import { subscribe } from "../domain/events"
import { mockSendEmail } from "../services/mockEmail"

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