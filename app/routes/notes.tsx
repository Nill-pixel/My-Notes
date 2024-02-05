import { redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoreNotes, storeNotes } from "~/data/notes";
export default function NotesPage() {
  return <main>
    <NewNote />
  </main>
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)

  const existingNotes = await getStoreNotes()
  noteData.id = new Date().toISOString()
  const updateNotes = existingNotes.concat(noteData)
  await storeNotes(updateNotes)
  return redirect('/notes')
}

export function links() {
  return [...newNoteLinks()]
}