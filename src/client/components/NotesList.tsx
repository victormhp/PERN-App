import { useEffect } from 'react';
import { useConfigStore, useNotesStore } from '@/store';
import { useAxiosPrivate } from '@/hooks';
import NoteDialog from './NoteDialog';

function NotesList() {
  const axiosPrivate = useAxiosPrivate();
  const view = useConfigStore((state) => state.view);
  const getNotes = useNotesStore((state) => state.getNotes);
  const notes = useNotesStore((state) => state.notes);

  // Get notes
  useEffect(() => {
    const controller = new AbortController();

    void getNotes(axiosPrivate);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div
      className={`h-full w-4/5 break-inside-avoid gap-4 ${
        view === 'grid' ? 'columns-[10rem]' : 'columns-auto lg:w-2/5'
      } max-sm:columns-auto`}
    >
      {notes.map((note) => (
        <NoteDialog key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NotesList;
