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
  Icons,
} from '@/components';
import { useAxiosPrivate } from '@/hooks';
import { useNotesStore } from '@/store';
import { useEffect, useRef, type MouseEvent, useState } from 'react';
import type { Note, UpdateNote } from 'src/server/db/schemas';
import { type SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  note: Note;
}

function NoteDialog({ note }: Props) {
  const axiosPrivate = useAxiosPrivate();

  // Update notes
  const updateNote = useNotesStore((state) => state.updateNote);
  const [openDialog, setOpenDialog] = useState(false);
  const toggleDialog = () => setOpenDialog((prev) => !prev);

  // Adjust text area
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 16}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [openDialog]);

  const { register, handleSubmit } = useForm<UpdateNote>({
    defaultValues: {
      title: note.title,
      description: note.description,
    },
  });

  const { ref, ...rest } = register('description');

  const onSubmit: SubmitHandler<UpdateNote> = async (noteData) => {
    await updateNote(note.id, noteData, axiosPrivate);
    toggleDialog();
  };

  // Delete notes
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const onDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    await deleteNote(note.id, axiosPrivate);
  };

  return (
    <Dialog key={note.id} open={openDialog} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <div className='mb-4 max-h-fit overflow-hidden whitespace-pre-wrap break-words rounded-lg border border-border bg-background px-6 py-4'>
          <h4 className='mb-2 font-semibold'>{note.title}</h4>
          <p className='select-none'>{note.description}</p>
        </div>
      </DialogTrigger>
      <DialogContent className='w-[80vw] p-0 sm:max-w-[550px]'>
        <DialogHeader className='p-6'>
          <DialogTitle>
            <Input
              id='title'
              {...register('title')}
              autoFocus
              spellCheck='false'
              maxLength={50}
              className='border-transparent pl-0 text-lg focus-visible:ring-0'
            />
          </DialogTitle>
          <DialogDescription>
            <Textarea
              id='description'
              {...rest}
              ref={(e) => {
                ref(e);
                textareaRef.current = e;
              }}
              spellCheck='false'
              className='max-h-[60vh] overflow-y-auto border-transparent pl-0 focus-visible:ring-0'
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
            <Button variant='ghost' onClick={onDelete}>
              Delete
            </Button>
            <Button variant='ghost' type='submit' onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;
