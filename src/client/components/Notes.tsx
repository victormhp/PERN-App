import NoteForm from './NoteForm';

function Notes() {
  return (
    <section className='ml-20 flex w-full flex-col items-center justify-between'>
      <NoteForm />
      <div>NOTAS</div>
    </section>
  );
}

export default Notes;
