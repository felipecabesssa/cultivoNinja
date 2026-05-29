// frontend/src/api.ts
export const apiFetch = async (endpoint: string) => {
  const response = await fetch(`/api${endpoint}`);
  if (!response.ok) throw new Error('Erro na comunicação com o backend');
  return response.json();
};