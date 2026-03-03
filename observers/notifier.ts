import { subscribe } from "../domain/events"

export function registerNotifier() {
  subscribe((event) => {
    if (event.type === "OrderCreated") {
      console.log(`✅ Notify: Order ${event.orderId} created. Total=${event.total}`)
    }
  })
}