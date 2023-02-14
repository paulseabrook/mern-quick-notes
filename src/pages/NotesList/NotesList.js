import { useState } from 'react';

//import * as notesAPI from '../../utilities/notes-api';
// import * as notesServices from '../../utilities/notes-service';

export default function NotesList() {
  const [notes, setNotes] = useState(null);

  // function componentDidMount() {
  //   // Simple GET request using fetch
  //   fetch('http://localhost:3001/notes')
  //     .then((response) => response.json())
  //     .then((data) => setNotes({ notes: data.notes }));
  // }

  // componentDidMount();

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
