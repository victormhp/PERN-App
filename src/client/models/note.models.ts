export interface Note {
  id: number;
  userId: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface NewNote {
  userId: number;
  title: string;
  description: string;
}

export interface FormNote {
  title: string;
  description: string;
}
