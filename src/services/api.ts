import type { ApiResponse, FuncGroup, LinkGroup } from '@/types';

const API_BASE_URL = import.meta.env.PROD ? '/api' : '/api';

async function request<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: ApiResponse<T> = await response.json();
  if (data.code !== 0) {
    throw new Error(data.message || 'Request failed');
  }
  return data.data;
}

export const api = {
  getToolData: (): Promise<FuncGroup[]> => request<FuncGroup[]>('/tool-data'),
  getReferenceData: (): Promise<LinkGroup[]> => request<LinkGroup[]>('/reference-data'),
};
