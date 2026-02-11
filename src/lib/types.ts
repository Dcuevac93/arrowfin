export type PriceLevel = {
  price: number
  bidSize: number
  askSize: number
}

export type Flash = {
  bid: 'up' | 'down' | null
  ask: 'up' | 'down' | null
}
