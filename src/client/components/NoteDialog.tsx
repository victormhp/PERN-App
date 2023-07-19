import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Textarea,
  Button,
} from '@/components/ui';
import { useAxiosPrivate, useForm } from '@/hooks';
import { useNotesStore } from '@/store';
import { noteDesciptionValidation, noteTitleValidation } from '@/utils';
import { useEffect, useRef, type MouseEvent } from 'react';
import { type UpdateNote, type Note } from '../../db/schemas';

interface Props {
  note: Note;
}

function NoteDialog({ note }: Props) {
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
      await updateNote(note.id, noteData, axiosPrivate);
    },
  });

  // Delete notes
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    await deleteNote(note.id, axiosPrivate);
  };

  return (
    <Dialog key={note.id}>
      <DialogTrigger asChild>
        <div className='mb-4 h-fit overflow-hidden whitespace-pre-wrap rounded-lg border border-border bg-background px-6 py-4'>
          <h4 className='mb-2 font-semibold'>{note.title}</h4>
          <p>{note.description}</p>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Note</DialogTitle>
          <DialogDescription>Make changes to your note here. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <Input id='title' value={noteData.title} onChange={handleChange('title')} />
        <Textarea id='description' ref={textareaRef} value={noteData.description} onChange={handleChange('description')} />
        <DialogFooter>
          <Button variant='outline' onClick={handleDelete}>
            Delete
          </Button>
          <Button type='submit' onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;
