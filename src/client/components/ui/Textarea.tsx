import { type TextareaHTMLAttributes, useRef, useEffect, forwardRef } from 'react';
import { cn } from '@/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    console.log(textarea);

    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 16}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full resize-none overflow-hidden rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={(instance: HTMLTextAreaElement) => {
        textareaRef.current = instance;
        if (typeof ref === 'function') ref(instance);
        else if (ref !== null) ref.current = instance;
      }}
      onInput={adjustTextareaHeight}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
