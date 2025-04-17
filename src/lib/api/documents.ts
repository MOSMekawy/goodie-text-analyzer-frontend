import axios from 'axios';
import { Envelope } from './envelope';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:4000',
});

export interface Document {
  id: number;
  title: string;
  content: string;
  sourceId: number;
  externalId: number;
  createdAt: Date;
}

export interface DocumentsResponse {
  documents: Document[];
  total: number;
}

export const fetchDocuments = async (params: {
  keywordId?: number;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  skip?: number;
}) => {
  const { data } = await api.get<Envelope<DocumentsResponse>>('/documents', { params });
  return data;
};
