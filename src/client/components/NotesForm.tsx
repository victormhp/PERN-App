import { useRef, useState } from 'react';
import { useAxiosPrivate, useClickOutside, useForm } from '@/hooks';
import { useAuthStore, useNotesStore } from '@/store';
import { noteDesciptionValidation, noteTitleValidation } from '@/utils';
import { type NewNote, type UpdateNote } from '../../db/schemas';
import { Button, Input, Textarea } from './ui';

function NoteForm() {
  const axiosPrivate = useAxiosPrivate();
  const createNote = useNotesStore((state) => state.createNote);
  const userId = useAuthStore.getState().user?.id;

  const toggleRef = useRef<HTMLFormElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpen = () => setIsFormOpen(true);
  const handleClose = () => setIsFormOpen(false);
  useClickOutside(toggleRef, handleClose);

  const {
    data: note,
    setData,
    handleChange,
    handleSubmit,
  } = useForm<UpdateNote>({
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
        if (res) {
          handleClose();
          setData({} as NewNote);
        }
      }
    },
  });

  return (
    <form noValidate ref={toggleRef} onSubmit={handleSubmit} className='my-8 w-4/5 rounded-lg border border-border px-5 py-3 lg:w-2/5'>
      {isFormOpen ? (
        <>
          <div className='mb-4'>
            <Input
              id='title'
              name='title'
              aria-describedby='titleNote'
              placeholder='Title'
              autoComplete='off'
              autoCorrect='off'
              spellCheck='false'
              maxLength={50}
              value={note.title ?? ''}
              onChange={handleChange('title')}
              className='border-transparent pl-0 text-lg focus-visible:ring-0'
            />
            <Textarea
              id='description'
              name='description'
              aria-describedby='descriptionNote'
              placeholder='Create a note...'
              autoComplete='off'
              autoCorrect='off'
              spellCheck='false'
              value={note.description ?? ''}
              onChange={handleChange('description')}
              className='border-transparent pl-0 focus-visible:ring-0'
            />
          </div>
          <div className='w-full space-x-4 text-end'>
            <Button type='submit' variant='ghost'>
              Create
            </Button>
            <Button variant='ghost' onClick={handleClose}>
              Close
            </Button>
          </div>
        </>
      ) : (
        <Input
          placeholder='Create a note...'
          onClick={handleOpen}
          className='h-6 border-transparent bg-transparent pl-0 placeholder:text-lg placeholder:font-medium focus-visible:ring-0'
        />
      )}
    </form>
  );
}

export default NoteForm;
