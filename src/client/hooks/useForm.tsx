/* eslint-disable @typescript-eslint/ban-types */
import { type ChangeEvent, useState, useEffect, type FormEvent } from 'react';

export interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

function useForm<T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) {
  const [data, setData] = useState<T>((options?.initialValues ?? {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});
  const [isFormInvalid, setFormInvalid] = useState(false);

  useEffect(() => {
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<T> = {};

      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        const required = validation?.required;
        if (required?.value && (value == null || value.trim() === '')) {
          valid = false;
          newErrors[key] = required?.message;

          continue;
        }

        const pattern = validation?.pattern;
        if (pattern?.value != null && value?.length > 0 && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;

          continue;
        }

        const custom = validation?.custom;
        if (custom?.isValid && value?.length > 0 && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;

          continue;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        setFormInvalid(true);
        return;
      }
    }

    setErrors({});
    setFormInvalid(false);
  }, [data]);

  const handleChange =
    <S,>(key: keyof T, sanitizeFn?: (value: string) => S) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = sanitizeFn ? sanitizeFn(event.target.value) : event.target.value;

      setData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormInvalid) return;

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    data,
    errors,
    isFormInvalid,
    handleChange,
    handleSubmit,
  };
}

export default useForm;