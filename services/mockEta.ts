export function mockRecalculateEta(orderId: string) {
  const etaHours = Math.floor(Math.random() * 48) + 1
  console.log(`[MOCK ETA] order=${orderId} eta=${etaHours}h`)
  return etaHours
}