import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import style from '~/css/note-details.css'
import { getStoreNotes } from "~/data/notes";
import { Notes } from "~/interface/notes.server";

interface NoteListProps {
  selectedNote: Notes
}

export default function NoteDetailsPage() {
  const { selectedNote } = useLoaderData<NoteListProps>()
  return <main id="note-details">
    <header>
      <nav>
        <Link to="/notes"> Back to all Notes</Link>
      </nav>
      <h1>{selectedNote.title}</h1>
    </header>
    <p id="note-details-content">{selectedNote.content}</p>
  </main>
}
export const loader: LoaderFunction = async ({ params }) => {

  const notes: Notes[] = await getStoreNotes()
  const noteId = params.noteId
  const selectedNote = notes.find((note) => note.id === noteId)

  return { selectedNote }
}
export const links = () => {
  return [{ rel: 'stylesheet', href: style }]
}