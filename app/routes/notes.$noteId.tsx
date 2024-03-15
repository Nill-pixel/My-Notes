import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import style from '~/css/note-details.css'
import { getStoreNotes } from "~/data/notes";
import { Notes } from "~/interface/notes.server";
import { getNotes } from "~/utils/note.server";

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

  const notes = await getNotes()
  const noteId = params.noteId
  const selectedNote = notes.find((note) => note.id === noteId)

  if (!selectedNote) {
    throw json(
      { message: 'Could not find note id ' + noteId },
      { status: 404 }
    )
  }

  return { selectedNote }
}
export const links = () => {
  return [{ rel: 'stylesheet', href: style }]
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data.selectedNote.title }]
}