import { useEffect, useRef } from 'react';
import { useNotesStore } from '../store';
import { useAxiosPrivate, useClickOutside } from '../hooks';
import NotesUpdateForm from './NotesUpdateForm';

function NotesList() {
  const axiosPrivate = useAxiosPrivate();
  const view = useNotesStore((state) => state.view);
  const getNotes = useNotesStore((state) => state.getNotes);
  const notes = useNotesStore((state) => state.notes);

  // Get current note
  const currentNote = useNotesStore((state) => state.currentNote);
  const setCurrentNote = useNotesStore((state) => state.setCurrentNote);
  const currentNoteRef = useRef<HTMLFormElement>(null);
  const closeCurrentNote = () => setCurrentNote(null);
  useClickOutside(currentNoteRef, closeCurrentNote);

  // Get notes
  useEffect(() => {
    const controller = new AbortController();

    const get = async () => await getNotes(axiosPrivate);
    void get();

    return () => {
      controller.abort();
    };
  }, [notes]);

  return (
    <div
      className={`h-full w-4/5 break-inside-avoid gap-4 ${
        view === 'grid' ? 'columns-[10rem]' : 'columns-auto lg:w-2/5'
      } max-sm:columns-auto`}
    >
      {notes.map((note) => (
        <div
          key={note.id}
          className={`mb-4 h-fit overflow-hidden whitespace-pre-wrap rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-2 ${
            currentNote && currentNote.id === note.id ? 'opacity-0' : ''
          }`}
          onClick={() => setCurrentNote(note)}
        >
          <h4 className='mb-2 font-medium'>{note.title}</h4>
          <p>{note.description}</p>
        </div>
      ))}
      {currentNote ? <NotesUpdateForm note={currentNote} noteRef={currentNoteRef} onClose={closeCurrentNote} /> : null}
    </div>
  );
}

export default NotesList;
