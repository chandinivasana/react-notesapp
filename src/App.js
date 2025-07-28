import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id || null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleNewNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'Untitled Note',
      content: '',
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (idToDelete) => {
    const filteredNotes = notes.filter(note => note.id !== idToDelete);
    setNotes(filteredNotes);
    // If the active note was deleted, set active note to null or the first note
    if (activeNoteId === idToDelete) {
      setActiveNoteId(filteredNotes[0]?.id || null);
    }
  };

  const handleUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map(note => 
      note.id === updatedNote.id ? { ...updatedNote, lastModified: Date.now() } : note
    );
    // Sort notes by last modified date to bring the updated one to the top
    const sortedNotes = updatedNotesArray.sort((a, b) => b.lastModified - a.lastModified);
    setNotes(sortedNotes);
  };

  const getActiveNote = () => notes.find(note => note.id === activeNoteId);

  return (
    <div className="bg-primary text-text w-full h-screen font-sans flex">
      <Sidebar onNewNote={handleNewNote} />
      <NoteList 
        notes={notes} 
        activeNoteId={activeNoteId} 
        setActiveNoteId={setActiveNoteId} 
        onDeleteNote={handleDeleteNote} 
      />
      <div className="flex-grow">
        <NoteEditor 
          activeNote={getActiveNote()} 
          onUpdateNote={handleUpdateNote} 
        />
      </div>
    </div>
  );
}

export default App;