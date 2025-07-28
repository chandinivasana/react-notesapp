import { TrashIcon } from '@heroicons/react/24/solid';

function NoteCard({ note, isActive, onSelect, onDelete }) {
  const formattedDate = new Date(note.lastModified).toLocaleDateString("en-US", {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Stop event from bubbling up to the parent div when delete is clicked
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(note.id);
  }

  return (
    <div 
      onClick={onSelect}
      className={`p-4 rounded-lg mb-2 cursor-pointer transition-all border-2 
        ${isActive ? 'bg-primary-light border-secondary' : 'bg-primary border-transparent hover:border-white/20'}`
      }
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-text truncate pr-2">{note.title}</h3>
        <button onClick={handleDeleteClick} className="text-text-light hover:text-red-500 transition-colors flex-shrink-0">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-text-light truncate mt-1">{note.content || "No additional content"}</p>
      <p className="text-xs text-text-light mt-2">{formattedDate}</p>
    </div>
  );
}

export default function NoteList({ notes, activeNoteId, setActiveNoteId, onDeleteNote }) {
  return (
    <div className="w-96 bg-primary p-4 border-r border-white/10 overflow-y-auto">
      {notes.map(note => (
        <NoteCard 
          key={note.id}
          note={note}
          isActive={note.id === activeNoteId}
          onSelect={() => setActiveNoteId(note.id)}
          onDelete={onDeleteNote}
        />
      ))}
    </div>
  );
}