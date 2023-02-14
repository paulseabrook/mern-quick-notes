import { useState } from 'react';

//import * as notesAPI from '../../utilities/notes-api';
// import * as notesServices from '../../utilities/notes-service';

export default function NotesList() {
  const [notes, setNotes] = useState(null);

  // function fetchData() {
  //   notesServices.getNotes().then((notes) => console.log(notes));
  // }

  // fetchData();

  return (
    <main className='NotesList'>
      {notes ? (
        <>
          <span>Here are some notes</span>
        </>
      ) : (
        <span>No Notes Yet!</span>
      )}
    </main>
  );
}
