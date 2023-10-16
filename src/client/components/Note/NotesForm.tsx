import { useRef, useState } from 'react';
import { useAxiosPrivate, useClickOutside } from '@/hooks';
import { useAuthStore, useNotesStore } from '@/store';
import { type NewNote, type UpdateNote } from 'src/server/db/schemas';
import { Input, Textarea, Button, Form, FormField, FormItem, FormControl, FormMessage } from '@/components';
import { useForm } from 'react-hook-form';

function NoteForm() {
  const axiosPrivate = useAxiosPrivate();
  const createNote = useNotesStore((state) => state.createNote);
  const userId = useAuthStore.getState().user?.id;

  const toggleRef = useRef<HTMLFormElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpen = () => setIsFormOpen(true);
  const handleClose = () => setIsFormOpen(false);
  useClickOutside(toggleRef, handleClose);

  const form = useForm<UpdateNote>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (note: UpdateNote) => {
    if (userId) {
      const noteData: NewNote = {
        userId,
        title: note.title,
        description: note.description,
      };
      const res = await createNote(noteData, axiosPrivate);
      if (res) {
        handleClose();
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        ref={toggleRef}
        className='my-8 w-4/5 rounded-lg border border-border px-5 py-3 lg:w-2/5'
      >
        {isFormOpen ? (
          <>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='text'
                      aria-describedby='title'
                      placeholder='Title'
                      className='border-transparent pl-0 text-lg focus-visible:ring-0'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      aria-describedby='descriptionNote'
                      placeholder='Create a note...'
                      className='border-transparent pl-0 focus-visible:ring-0'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
    </Form>
  );
}

export default NoteForm;
