import { useState } from 'react';

import { getNotes } from '../../utilities/notes-api';
// import * as notesServices from '../../utilities/notes-service';

export default function NotesList() {
  const [notes, setNotes] = useState(null);

  return (
    <main className='NotesList'>
      {notes ? (
        <>
          <span>{notes}</span>
        </>
      ) : (
        <span>No Notes Yet!</span>
      )}
    </main>
  );
}
