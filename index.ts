import { v4 as uuidv4 } from "uuid"
import { createOrder } from "./domain/order"
import { publish } from "./domain/events"

import { registerLogger } from "./observers/logger"
import { registerNotifier } from "./observers/notifier"
import { registerEtaCalculator } from "./observers/eta"

// Plug observers into the event system
registerLogger()
registerNotifier()
registerEtaCalculator()

// Wrong input that should be rejected by the domain logic
const orderOneRaw = {
  id: uuidv4(),
  name: "order one",
  price: -100,
  quantity: 200000000,
}

console.log("RAW input (invalid):", orderOneRaw)

try {
  const orderOne = createOrder(orderOneRaw)
  console.log("DOMAIN order:", orderOne)
} catch (e) {
  const msg = (e as Error).message
  console.error("Invalid order input:", msg)

  publish({ type: "OrderRejected", reason: msg, raw: orderOneRaw })
}

// Valid input (should succeed + trigger observers)
const orderTwoRaw = {
  id: uuidv4(),
  name: "order two",
  price: 50,
  quantity: 2,
}

console.log("\nRAW input (valid):", orderTwoRaw)

try {
  const orderTwo = createOrder(orderTwoRaw)
  console.log("DOMAIN order:", orderTwo)
} catch (e) {
  console.error("Unexpected error:", (e as Error).message)
}