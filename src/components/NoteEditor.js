import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';

export default function NoteEditor({ activeNote, onUpdateNote }) {
  const [isPreview, setIsPreview] = useState(false);
  
  // Use local state to avoid laggy input, but update parent on change
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // When activeNote changes, update local state
  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
      setIsPreview(false); // Default to editor view on new note selection
    }
  }, [activeNote]);

  if (!activeNote) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-primary">
        <div className="text-text-light text-2xl">Select a note to get started, or create a new one!</div>
      </div>
    );
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onUpdateNote({ ...activeNote, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onUpdateNote({ ...activeNote, content: e.target.value });
  };

  return (
    <div className="h-full flex flex-col p-6 bg-primary">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="bg-transparent text-3xl font-bold focus:outline-none w-full"
        />
        <button onClick={() => setIsPreview(!isPreview)} className="bg-secondary text-white px-4 py-1 rounded-md text-sm font-semibold">
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      
      {/* Main Content Area */}
      {isPreview ? (
        <div className="prose prose-invert max-w-none flex-grow overflow-y-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={content}
          onChange={handleContentChange}
          className="flex-grow bg-transparent text-lg text-text-light focus:outline-none resize-none"
          placeholder="Start writing your note here..."
        ></textarea>
      )}
    </div>
  );
}