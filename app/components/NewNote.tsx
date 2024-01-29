import style from '~/components/NewNote.css'
function NewNote() {
  return (
    <form action="post" id="note-form">
      <p>
        <label htmlFor="tittle">Titlle</label>
        <input type="text" id="tittle" name="tittle" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" rows={5}></textarea>
      </p>
      <div className="form-actions">
        <button>Add Note</button>
      </div>
    </form>
  )
}

export default NewNote
export function links() {
  return [{ rel: 'stylesheet', href: style }]
}