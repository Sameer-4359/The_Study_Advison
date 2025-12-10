// src/hooks/useDocuments.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { documentApi } from '@/lib/api';
import { 
  BackendDocument, 
  DisplayDocumentType,
  DocumentType 
} from '@/lib/types/document';
import toast from 'react-hot-toast';

export interface Document extends BackendDocument {
  fileSize?: number;
  displayType?: DisplayDocumentType;
}

export interface DocumentStats {
  total: number;
  uploadedTypes: number;
  totalTypes: number;
  progressPercentage: number;
}

export const useDocuments = () => {
  const { token } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DocumentStats>({
    total: 0,
    uploadedTypes: 0,
    totalTypes: documentApi.getDisplayDocumentTypes().length,
    progressPercentage: 0,
  });

  // Load documents on mount and when token changes
  const loadDocuments = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await documentApi.getDocuments(token);
      
      // Add fileSize and displayType
      const docsWithMetadata = response.documents.map((doc: BackendDocument) => ({
        ...doc,
        fileSize: 0, // You can implement file size fetching if needed
        displayType: documentApi.getDisplayType(doc.type),
      }));

      setDocuments(docsWithMetadata);
      
      // Calculate stats
      const uploadedTypes = new Set(response.documents.map((doc: BackendDocument) => doc.type)).size;
      const progressPercentage = documentApi.calculateProgress(response.documents);
      
      setStats({
        total: response.total,
        uploadedTypes,
        totalTypes: documentApi.getDisplayDocumentTypes().length,
        progressPercentage,
      });
    } catch (error) {
      console.error('Error loading documents:', error);
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Initial load
  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  // Upload document
  const uploadDocument = async (file: File, typeKey: DisplayDocumentType) => {
    if (!token) {
      toast.error('You must be logged in to upload documents');
      return null;
    }

    try {
      const toastId = toast.loading('Uploading document...');
      const response = await documentApi.uploadDocument(token, file, typeKey);
      
      // Update local state
      const newDocument: Document = {
        ...response.document,
        fileSize: file.size,
        displayType: typeKey,
      };
      
      setDocuments(prev => {
        // Remove existing document of same type if exists
        const backendType = documentApi.getBackendType(typeKey);
        const filtered = prev.filter(doc => doc.type !== backendType);
        return [newDocument, ...filtered];
      });

      // Recalculate stats
      await loadDocuments();
      
      toast.dismiss(toastId);
      toast.success(response.message || 'Document uploaded successfully!');
      return response.document;
    } catch (error: any) {
      console.error('Error uploading document:', error);
      toast.error(error.message || 'Upload failed');
      return null;
    }
  };

  // Update document
  const updateDocument = async (id: number, file: File) => {
    if (!token) {
      toast.error('You must be logged in to update documents');
      return null;
    }

    try {
      const toastId = toast.loading('Updating document...');
      const response = await documentApi.updateDocument(token, id, file);
      
      // Find the document to get its type
      const existingDoc = documents.find(doc => doc.id === id);
      
      // Update local state
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === id 
            ? { 
                ...response.document, 
                fileSize: file.size,
                displayType: existingDoc?.displayType 
              }
            : doc
        )
      );

      toast.dismiss(toastId);
      toast.success('Document updated successfully!');
      return response.document;
    } catch (error: any) {
      console.error('Error updating document:', error);
      toast.error(error.message || 'Update failed');
      return null;
    }
  };

  // Delete document
  const deleteDocument = async (id: number) => {
    if (!token) {
      toast.error('You must be logged in to delete documents');
      return false;
    }

    try {
      const toastId = toast.loading('Deleting document...');
      await documentApi.deleteDocument(token, id);
      
      // Update local state
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      
      // Recalculate stats
      await loadDocuments();
      
      toast.dismiss(toastId);
      // toast.success('Document deleted successfully!');
      return true;
    } catch (error: any) {
      console.error('Error deleting document:', error);
      toast.error(error.message || 'Delete failed');
      return false;
    }
  };

  // Check if document type is uploaded
  const isDocumentUploaded = (typeKey: DisplayDocumentType) => {
    return documentApi.isDocumentTypeUploaded(documents, typeKey);
  };

  // Get document by type
  const getDocumentByType = (typeKey: DisplayDocumentType) => {
    return documentApi.getDocumentByType(documents, typeKey);
  };

  // Get all document types with their status
  const getAllDocumentStatus = () => {
    const displayTypes = documentApi.getDisplayDocumentTypes();
    return displayTypes.map((displayName) => {
      const doc = getDocumentByType(displayName);
      return {
        displayName,
        backendType: documentApi.getBackendType(displayName),
        isUploaded: !!doc,
        document: doc,
      };
    });
  };

  // Get document type display name
  const getDocumentDisplayTypes = () => {
    return documentApi.getDisplayDocumentTypes();
  };

  return {
    documents,
    loading,
    stats,
    uploadDocument,
    updateDocument,
    deleteDocument,
    loadDocuments,
    isDocumentUploaded,
    getDocumentByType,
    getAllDocumentStatus,
    getDocumentDisplayTypes,
  };
};