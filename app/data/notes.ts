import fs from 'fs/promises'
import { Notes } from '~/interface/notes.server'

export async function getStoreNotes() {
  const rawFileContent = await fs.readFile('notes.jsn', { encoding: 'utf-8' })
  const data = JSON.parse(rawFileContent)
  const storeNotes = data.notes ?? []
  return storeNotes
}

export function storeNotes(notes: Notes) {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }))
}
