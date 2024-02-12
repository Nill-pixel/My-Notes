import { ActionFunction, MetaFunction, LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
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

  if (!notes || notes.length === 0) {
    throw json({ message: 'Could not find any notes.' },
      {
        status: 404,
        statusText: 'Not found'
      })
  }

  return { notes }
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)

  if (noteData.title.toString().length < 5) {
    return { message: 'Invalid title - must be at least 5 characters long.' }
  }


  const existingNotes = await getStoreNotes()
  noteData.id = new Date().toISOString()
  const updateNotes = existingNotes.concat(noteData)
  await storeNotes(updateNotes)
  return redirect('/notes')
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()]
}

export const meta: MetaFunction = () => {
  return [
    {
      title: 'All Notes',
      desc: 'Manege your notes with ease.'
    }
  ]
}

export const ErrorBoundary = () => {
  const error = useRouteError() as Error

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <NewNote />
        <p className="info-message"> {error.data.message} </p>
      </main>
    )
  }
  return (
    <main className="error">
      <h1>An error accurred! </h1>
      <p> {error.message} </p>
      <p> Back to <Link to="/"> safety </Link>!</p>
    </main>
  )
}
