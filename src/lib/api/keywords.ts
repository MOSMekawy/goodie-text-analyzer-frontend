import axios from 'axios';
import { Envelope } from './envelope';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:4000',
});

export interface Keyword {
  id: number;
  word: string;
  frequency: number;
  positiveMentions: number;
  neutralMentions: number;
  negativeMentions: number;
}

export interface KeywordsResponse {
  keywords: Keyword[];
  total: number;
}

export const fetchKeywords = async (params: {
  search?: string;
  limit?: number;
  skip?: number;
}) => {
  const { data } = await api.get<Envelope<KeywordsResponse>>('/keywords', { params });
  return data;
};

export const fetchKeyword = async (id: number) => {
  const { data } = await api.get<Envelope<Keyword>>('/keywords/' + id);
  return data;
}
