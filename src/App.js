import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Notes from './pages/notes/Notes';
import NoteList from './components/NoteList';
import AddNewNote from './components/AddNewNote';
import EditNote from './components/EditNote';
import SingleNote from './components/SingleNote';
import NoteEdit from './components/NoteEdit';

function App() {
  return (
    < >
      <Router>
        <Routes>
          <Route path="/" element={<Notes />}>
            <Route index element={<NoteList />} />
            <Route path="/addnote" element={<AddNewNote />} />
            <Route path="/singlenote" element={<SingleNote />} />
            <Route path="/editnote" element={<EditNote />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
