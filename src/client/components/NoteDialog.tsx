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
import { Icons } from './Icons';

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
          <p className='select-none'>{note.description}</p>
        </div>
      </DialogTrigger>
      <DialogContent className='p-0 sm:max-w-[550px]'>
        <DialogHeader className='p-6'>
          <DialogTitle>
            <Input
              id='title'
              value={noteData.title}
              spellCheck='false'
              onChange={handleChange('title')}
              className='border-transparent pl-0 text-lg focus-visible:ring-0'
            />
          </DialogTitle>
          <DialogDescription>
            <Textarea
              id='description'
              ref={textareaRef}
              value={noteData.description}
              spellCheck='false'
              onChange={handleChange('description')}
              className='border-transparent pl-0 focus-visible:ring-0'
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='px-6 py-1'>
          <div className='flex items-center gap-x-1'>
            <Button variant='ghost' size='icon'>
              <Icons.palette className='h-4 w-4' />
            </Button>
            <Button variant='ghost' size='icon'>
              <Icons.tag className='h-4 w-4' />
            </Button>
            <Button variant='ghost' size='icon'>
              <Icons.archive className='h-4 w-4' />
            </Button>
            <div className='mx-2 h-5 w-[1px] bg-foreground' />
            <Button variant='ghost' size='icon'>
              <Icons.undo className='h-4 w-4' />
            </Button>
            <Button variant='ghost' size='icon'>
              <Icons.redo className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex gap-x-2'>
            <Button variant='ghost' onClick={handleDelete}>
              Delete
            </Button>
            <Button variant='ghost' type='submit' onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;
