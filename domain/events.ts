// unique emitter name
export const EMITTER = "OrderDomain" as const

// Domain events
export type DomainEvent =
  | { emitter: typeof EMITTER; type: "OrderCreated"; orderId: string; total: number }
  | { emitter: typeof EMITTER; type: "OrderRejected"; reason: string; raw: unknown }

// Observer type
type Listener = (event: DomainEvent) => void

// observers list
const listeners: Listener[] = []

// subscribe function
export function subscribe(listener: Listener) {
  listeners.push(listener)
}

// publish event
export function publish(event: DomainEvent) {
  for (const l of listeners) {
    l(event)
  }
}