import { v4 as uuidv4 } from "uuid"

/*
 **
 ** avoid any "weird" number as input
 */

/* 1.  factory function  */
/*  a factory function creates a new object  */

/* 2.  constructor function  */
// OOP
// a constructor function creates a new object and sets its properties

// create a primitive obsessed type

// modify this code for testing !!
// this replicates user input
/** ---------- Brand helper ---------- */
type Brand<T, Name extends string> = T & { readonly __brand: Name }
const brand = <T, Name extends string>(v: T) => v as Brand<T, Name>

function ensure(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(msg)
}
/** ---------- Domain primitives (branded) ---------- */
type OrderId = Brand<string, "OrderId">
type Price = Brand<number, "Price">
type Quantity = Brand<number, "Quantity">
type Total = Brand<number, "Total">
/** ---------- Smart constructors ---------- */
function createOrderId(raw: string): OrderId {
  ensure(raw.trim().length > 0, "OrderId cannot be empty")
  return brand<string, "OrderId">(raw)
}

function createPrice(n: number): Price {
  ensure(Number.isFinite(n), "Price must be finite")
  ensure(n >= 0, "Price cannot be negative")
  ensure(n <= 10_000, "Price exceeds maximum (10,000)")
  return brand<number, "Price">(n)
}

function createQuantity(n: number): Quantity {
  ensure(Number.isFinite(n), "Quantity must be finite")
  ensure(Number.isInteger(n), "Quantity must be an integer")
  ensure(n >= 1, "Quantity must be at least 1")
  ensure(n <= 10_000, "Quantity exceeds maximum (10,000)")
  return brand<number, "Quantity">(n)
}

function createTotal(price: Price, quantity: Quantity): Total {
  const total = (price as number) * (quantity as number)
  ensure(Number.isFinite(total), "Total must be finite")
  ensure(total <= 100_000_000, "Total exceeds maximum (100,000,000)")
  return brand<number, "Total">(total)
}
/** ---------- Entity ---------- */
type Order = Readonly<{
  id: OrderId
  name: string
  price: Price
  quantity: Quantity
  total: Total
}>

/** ---------- Parse, don't validate (boundary factory) ---------- */
function createOrder(input: {
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

  return Object.freeze({
    id,
    name: input.name.trim(),
    price,
    quantity,
    total,
  })
}

const orderOneRaw = {
	id: uuidv4(), // generate a unique id for the order
	name: "order one",
	price: -100,
	quantity: 200000000,
	total: 456465465465465400,
}

console.log("RAW input:", orderOneRaw)

/** Convert raw -> domain (this is where it should fail) */
try {
  const orderOne = createOrder({
    id: orderOneRaw.id,
    name: orderOneRaw.name,
    price: orderOneRaw.price,
    quantity: orderOneRaw.quantity,
  })
  console.log("DOMAIN order:", orderOne)
} catch (e) {
  console.error("Invalid order input:", (e as Error).message)
}
