// domain/order.ts
import { EMITTER, publish } from "./events.js"

//Brand helper 
export type Brand<T, Name extends string> = T & { readonly __brand: Name }
const brand = <T, Name extends string>(v: T) => v as Brand<T, Name>

function ensure(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg)
}

//Domain primitives (branded)
export type OrderId = Brand<string, "OrderId">
export type Price = Brand<number, "Price">
export type Quantity = Brand<number, "Quantity">
export type Total = Brand<number, "Total">

//Smart constructors
export function createOrderId(raw: string): OrderId {
  ensure(raw.trim().length > 0, "OrderId cannot be empty")
  return brand<string, "OrderId">(raw)
}

export function createPrice(n: number): Price {
  ensure(Number.isFinite(n), "Price must be finite")
  ensure(n >= 0, "Price cannot be negative")
  ensure(n <= 10_000, "Price exceeds maximum (10,000)")
  return brand<number, "Price">(n)
}

export function createQuantity(n: number): Quantity {
  ensure(Number.isFinite(n), "Quantity must be finite")
  ensure(Number.isInteger(n), "Quantity must be an integer")
  ensure(n >= 1, "Quantity must be at least 1")
  ensure(n <= 10_000, "Quantity exceeds maximum (10,000)")
  return brand<number, "Quantity">(n)
}

export function createTotal(price: Price, quantity: Quantity): Total {
  const total = (price as number) * (quantity as number)
  ensure(Number.isFinite(total), "Total must be finite")
  ensure(total <= 100_000_000, "Total exceeds maximum (100,000,000)")
  return brand<number, "Total">(total)
}

//Entity
export type Order = Readonly<{
  id: OrderId
  name: string
  price: Price
  quantity: Quantity
  total: Total
}>

//Parse, don't validate (boundary factory)
export function createOrder(input: {
  id: string
  name: string
  price: number
  quantity: number
}): Order {
  ensure(input.name.trim().length > 0, "Order name cannot be empty")

  const id = createOrderId(input.id)
  const price = createPrice(input.price)
  const quantity = createQuantity(input.quantity)
  const total = createTotal(price, quantity)

  const order = Object.freeze({
    id,
    name: input.name.trim(),
    price,
    quantity,
    total,
  })

  //domain event
    publish({
    emitter: EMITTER,
    type: "OrderCreated",
    orderId: id,
    total: Number(total),
  })

  return order
}