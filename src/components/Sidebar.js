import { PlusCircleIcon } from '@heroicons/react/24/solid';

export default function Sidebar({ onNewNote }) {
  return (
    <div className="w-64 bg-primary-light p-4 border-r border-white/10 flex flex-col">
      <button 
        onClick={onNewNote}
        className="flex items-center justify-center gap-2 w-full p-2 mb-6 bg-secondary text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
      >
        <PlusCircleIcon className="w-6 h-6" />
        New Note
      </button>
      <div className="flex-grow">
        {/* You can add folders or tags here later */}
        <h2 className="text-text-light text-lg font-semibold">All Notes</h2>
      </div>
    </div>
  );
}