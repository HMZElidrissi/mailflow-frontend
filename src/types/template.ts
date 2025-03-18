export interface EmailTemplate {
    id: number;
    name: string;
    subject: string;
    content: string;
    variables: Record<string, string>;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface EmailTemplateRequest {
    name: string;
    subject: string;
    content: string;
    variables: Record<string, string>;
    description?: string;
}