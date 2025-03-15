export interface Contact {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactRequest {
  email: string;
  firstName: string;
  lastName: string;
  tags: string[];
}