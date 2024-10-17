const API_URL = import.meta.env.VITE_IMGLY_API_URL;

export const fetchDataStructure = async (): Promise<DataEntry[]> => {
  const response = await fetch(`${API_URL}/data.json`);
  return response.json();
};

export const fetchDataEntry = async (id: string): Promise<LeafInfo> => {
  const response = await fetch(`${API_URL}/entries/${id}.json`);
  return response.json();
};
