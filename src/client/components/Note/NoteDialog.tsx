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
import { useEffect, useRef, useState } from 'react';
import type { Note, UpdateNote } from 'src/server/db/schemas';
import { type SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  note: Note;
}

function NoteDialog({ note }: Props) {
  const axiosPrivate = useAxiosPrivate();

  const { register, handleSubmit } = useForm<UpdateNote>({
    defaultValues: {
      title: note.title,
      description: note.description,
    },
  });

  // Adjust text area
  const [openDialog, setOpenDialog] = useState(false);
  const toggleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  // Update note
  const updateNote = useNotesStore((state) => state.updateNote);
  const onUpdate: SubmitHandler<UpdateNote> = async (noteData) => {
    await updateNote(note.id, noteData, axiosPrivate);
    toggleDialog();
  };

  // Delete note
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const onDelete = async () => await deleteNote(note.id, axiosPrivate);

  return (
    <Dialog key={note.id} open={openDialog} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <div className='mb-4 max-h-[50vh] overflow-hidden whitespace-pre-wrap break-words rounded-lg border border-border bg-background px-6 py-4'>
          <h4 className='mb-2 font-semibold'>{note.title}</h4>
          <p className='select-none'>{note.description}</p>
        </div>
      </DialogTrigger>
      <DialogContent className='w-[80vw] p-0 sm:max-w-[550px]'>
        <DialogHeader className='p-6'>
          <DialogTitle>
            <Input {...register('title')} maxLength={50} autoFocus className='border-transparent pl-0 text-lg focus-visible:ring-0' />
          </DialogTitle>
          <DialogDescription>
            <Textarea {...register('description')} className='max-h-[60vh] overflow-y-auto border-transparent pl-0 focus-visible:ring-0' />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='px-6 py-2'>
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
            <Button variant='ghost' type='submit' onClick={handleSubmit(onUpdate)}>
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NoteDialog;
