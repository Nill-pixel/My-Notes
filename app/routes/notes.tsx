import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoreNotes, storeNotes } from "~/data/notes";
import { Notes } from "~/interface/notes.server";

interface NoteListProps {
  notes: Notes[]
}

export default function NotesPage() {
  const { notes } = useLoaderData<NoteListProps>();
  return <main>
    <NewNote />
    <NoteList notes={notes} />
  </main>
}
export const loader: LoaderFunction = async () => {
  const notes: Notes[] = await getStoreNotes()
  return { notes }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)

  const existingNotes = await getStoreNotes()
  noteData.id = new Date().toISOString()
  const updateNotes = existingNotes.concat(noteData)
  await storeNotes(updateNotes)
  return redirect('/notes')
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()]
}