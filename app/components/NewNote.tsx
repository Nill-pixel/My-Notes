import { Form, useActionData, useNavigation } from '@remix-run/react'
import style from '~/components/NewNote.css'
import { MessageError } from '~/interface/notes.server'
const NewNote = () => {
  const data = useActionData<MessageError>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method='post' id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" rows={5}></textarea>
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add Note'}</button>
      </div>
    </Form>
  )
}

export default NewNote
export function links() {
  return [{ rel: 'stylesheet', href: style }]
}