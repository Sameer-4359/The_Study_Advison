// src/lib/types/document.ts
export type DocumentType = 
  | 'ACADEMIC_TRANSCRIPT'
  | 'DEGREE_DIPLOMA'
  | 'LANGUAGE_PROFICIENCY'
  | 'PASSPORT_COPY'
  | 'RESUME_CV'
  | 'STATEMENT_OF_PURPOSE';

export type DisplayDocumentType = 
  | 'Academic Transcripts'
  | 'Degree/Diploma Certificates'
  | 'Language Proficiency'
  | 'Passport Copy'
  | 'Resume/CV'
  | 'Statement of Purpose';

export interface DocumentTypeMap {
  'Academic Transcripts': DocumentType;
  'Degree/Diploma Certificates': DocumentType;
  'Language Proficiency': DocumentType;
  'Passport Copy': DocumentType;
  'Resume/CV': DocumentType;
  'Statement of Purpose': DocumentType;
}

export interface BackendDocument {
  id: number;
  userId: number;
  type: DocumentType;
  fileUrl: string;
  fileName: string;
  createdAt: string;
}

export interface UploadDocumentResponse {
  status: string;
  message: string;
  document: BackendDocument;
}

export interface GetDocumentsResponse {
  status: string;
  message: string;
  total: number;
  documents: BackendDocument[];
  groupedDocuments: Record<DocumentType, BackendDocument[]>;
}