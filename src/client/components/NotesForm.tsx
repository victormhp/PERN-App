import { type ChangeEvent, useRef, useState } from 'react';
import { useAxiosPrivate, useClickOutside, useForm } from '../hooks';
import { type FormNote, type NewNote } from '../models';
import { useAuthStore, useNotesStore } from '../store';
import { noteDesciptionValidation, noteTitleValidation } from '../utils';

function NoteForm() {
  const axiosPrivate = useAxiosPrivate();
  const createNote = useNotesStore((state) => state.createNote);
  const userId = useAuthStore.getState().user?.id;

  const toggleRef = useRef<HTMLFormElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpen = () => setIsFormOpen(true);
  const handleClose = () => setIsFormOpen(false);
  useClickOutside(toggleRef, handleClose);

  const handleTextareaResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const {
    data: note,
    setData,
    handleChange,
    handleSubmit,
  } = useForm<FormNote>({
    validations: {
      title: noteTitleValidation,
      description: noteDesciptionValidation,
    },
    onSubmit: async () => {
      if (userId) {
        const noteData: NewNote = {
          userId,
          title: note.title,
          description: note.description,
        };
        const res = await createNote(noteData, axiosPrivate);
        if (res) setData({} as NewNote);
      }
    },
  });

  return (
    <form
      ref={toggleRef}
      className='my-8 w-4/5 rounded-lg border border-zinc-500 px-5 py-3 shadow-note lg:w-2/5'
      onSubmit={handleSubmit}
      noValidate
    >
      {isFormOpen ? (
        <>
          <div className='mb-4 space-y-4'>
            <input
              id='title'
              name='title'
              type='text'
              aria-describedby='titleNote'
              placeholder='Title'
              autoComplete='off'
              autoCorrect='off'
              value={note.title ?? ''}
              onChange={handleChange('title')}
              className='w-full cursor-text bg-transparent text-start outline-none placeholder:text-lg placeholder:font-medium placeholder:text-zinc-400'
            />
            <textarea
              id='description'
              name='description'
              aria-describedby='descriptionNote'
              placeholder='Create a note...'
              autoComplete='off'
              autoCorrect='off'
              value={note.description ?? ''}
              onChange={handleChange('description')}
              onInput={handleTextareaResize}
              className='w-full cursor-text resize-none overflow-hidden bg-transparent text-start outline-none placeholder:text-zinc-400'
            />
          </div>
          <div className='w-full space-x-4 text-end'>
            <button
              type='submit'
              className='rounded-md bg-transparent px-6 py-2 transition-all hover:bg-zinc-800 hover:bg-opacity-60 focus:bg-zinc-800 focus:bg-opacity-60 focus:outline-none'
            >
              Create
            </button>
            <button
              className='rounded-md bg-transparent px-6 py-2 transition-all hover:bg-zinc-800 hover:bg-opacity-60 focus:bg-zinc-800 focus:bg-opacity-60 focus:outline-none'
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <input
          className='w-full cursor-text bg-transparent text-start outline-none placeholder:text-lg placeholder:font-medium placeholder:text-zinc-500'
          placeholder='Create a note...'
          onClick={handleOpen}
        />
      )}
    </form>
  );
}

export default NoteForm;
