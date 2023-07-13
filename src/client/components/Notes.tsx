import NoteForm from './NotesForm';
import NotesList from './NotesList';

function Notes() {
  return (
    <section className='ml-20 flex h-full w-full flex-col items-center justify-start'>
      <NoteForm />
      <NotesList />
    </section>
  );
}

export default Notes;
