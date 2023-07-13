import { useEffect, useRef } from 'react';
import { useNotesStore } from '../store';
import { useAxiosPrivate, useClickOutside } from '../hooks';

function NotesList() {
  const axiosPrivate = useAxiosPrivate();
  const view = useNotesStore((state) => state.view);
  const getNotes = useNotesStore((state) => state.getNotes);
  const notes = useNotesStore((state) => state.notes);

  useEffect(() => {
    const controller = new AbortController();

    const get = async () => await getNotes(axiosPrivate);
    void get();

    return () => {
      controller.abort();
    };
  }, []);

  const currentNote = useNotesStore((state) => state.currentNote);
  const setCurrentNote = useNotesStore((state) => state.setCurrentNote);
  const currentNoteRef = useRef<HTMLDivElement>(null);
  const closeCurrentNote = () => setCurrentNote(null);

  useClickOutside(currentNoteRef, closeCurrentNote);

  return (
    <div
      className={`h-full w-4/5 break-inside-avoid gap-4 ${
        view === 'list' ? 'columns-[10rem]' : 'columns-auto lg:w-2/5'
      } max-sm:columns-auto`}
    >
      {notes.map((note) => (
        <article
          key={note.id}
          className={`mb-4 h-fit overflow-hidden whitespace-pre-wrap rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-2 ${
            currentNote === note ? 'opacity-0' : ''
          }`}
          onClick={() => setCurrentNote(note)}
        >
          <h4 className='mb-2 font-medium'>{note.title}</h4>
          <p>{note.description}</p>
        </article>
      ))}
      {currentNote ? (
        <>
          <div className='fixed inset-0 z-40 h-screen w-screen bg-zinc-900 opacity-50' aria-hidden='true'></div>
          <div
            className='pointer-events-auto fixed left-1/2 top-1/3 z-50 h-max w-1/3 -translate-x-1/2 -translate-y-1/2 select-text whitespace-pre-wrap rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-2 opacity-100 shadow-note transition-transform'
            ref={currentNoteRef}
            tabIndex={0}
          >
            <h4 className='mb-2 font-medium'>{currentNote.title}</h4>
            <p>{currentNote.description}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default NotesList;
