export type DomainEvent =
  | { type: "OrderCreated"; orderId: string; total: number }
  | { type: "OrderRejected"; reason: string; raw: unknown }

type Listener = (event: DomainEvent) => void
const listeners: Listener[] = []

export function subscribe(listener: Listener) {
  listeners.push(listener)
}

export function publish(event: DomainEvent) {
  for (const l of listeners) l(event)
}