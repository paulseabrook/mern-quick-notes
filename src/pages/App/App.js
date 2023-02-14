import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import NotesList from '../NotesList/NotesList';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';

function App() {
  const [user, setUser] = useState(getUser());

  // if there is a user, render the NewOrderPage, else, render the AuthPage
  return (
    <main className='App'>
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          {/* our Route components must be within Routes element */}
          <Routes>
            {' '}
            {/* This path will be assigned to the element NewOrderPage */}
            <Route path='/notes' element={<NotesList />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
