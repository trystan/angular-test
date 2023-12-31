export interface Play {
  game: string
  players: string[]
  notes: string
}

export interface Session {
  id: number
  title: string
  // date: Date
  notes: string
  plays: Play[]
}