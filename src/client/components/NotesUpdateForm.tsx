import { useRef, useEffect } from 'react';
import { useNotesStore } from '../store';
import { useAxiosPrivate, useForm } from '../hooks';
import { noteDesciptionValidation, noteTitleValidation } from '../utils';
import { type Note, type UpdateNote } from '../../db/schemas/note.schema';

interface Props {
  note: Note;
  noteRef: React.RefObject<HTMLFormElement>;
  onClose: () => void;
}

function NotesUpdateForm({ note, noteRef, onClose }: Props) {
  const axiosPrivate = useAxiosPrivate();

  // Update notes
  const updateNote = useNotesStore((state) => state.updateNote);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  const {
    data: noteData,
    handleChange,
    handleSubmit,
  } = useForm<UpdateNote>({
    validations: {
      title: noteTitleValidation,
      description: noteDesciptionValidation,
    },
    initialValues: {
      title: note.title,
      description: note.description,
    },
    onSubmit: async () => {
      const res = await updateNote(note.id, noteData, axiosPrivate);
      if (res) onClose();
    },
  });

  // Delete notes
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const handleDeleteNote = async (noteId: number) => {
    onClose();
    await deleteNote(noteId, axiosPrivate);
  };

  return (
    <>
      <div className='fixed inset-0 z-40 h-screen w-screen bg-zinc-900 opacity-50' aria-hidden='true'></div>
      <form
        className='pointer-events-auto fixed left-1/2 top-1/3 z-50 w-1/3 -translate-x-1/2 -translate-y-1/2 select-text whitespace-pre-wrap rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-2 opacity-100 shadow-note transition-transform'
        ref={noteRef}
        onSubmit={handleSubmit}
      >
        <div className='mb-4 space-y-4'>
          <input
            id='title'
            name='title'
            type='text'
            aria-describedby='titleNote'
            placeholder='Title'
            autoComplete='off'
            autoCorrect='off'
            value={noteData.title}
            onChange={handleChange('title')}
            className='w-full cursor-text bg-transparent text-start text-lg font-medium outline-none'
          />
          <textarea
            id='description'
            ref={textareaRef}
            name='description'
            aria-describedby='descriptionNote'
            placeholder='Create a note...'
            autoComplete='off'
            autoCorrect='off'
            value={noteData.description}
            onChange={handleChange('description')}
            className='w-full cursor-text resize-none overflow-hidden whitespace-pre-wrap bg-transparent text-start outline-none'
          />
        </div>
        <div className='mt-4 flex items-center justify-between'>
          <div>
            <button
              className='rounded-md bg-transparent px-6 py-2 text-sm font-medium transition-all hover:bg-zinc-800 hover:bg-opacity-60 focus:bg-zinc-800 focus:bg-opacity-60 focus:outline-none'
              type='submit'
            >
              Save
            </button>
            <button
              className='rounded-md bg-transparent px-6 py-2 text-sm font-medium transition-all hover:bg-zinc-800 hover:bg-opacity-60 focus:bg-zinc-800 focus:bg-opacity-60 focus:outline-none'
              type='button'
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default NotesUpdateForm;
