const API_URL = import.meta.env.VITE_IMGLY_API_URL;

export const fetchNodes = async (): Promise<ImglyNode[]> => {
  const response = await fetch(`${API_URL}/data.json`);
  return response.json();
};

export const fetchNodeInfo = async (id: string): Promise<ImglyLeafNodeInfo> => {
  const response = await fetch(`${API_URL}/entries/${id}.json`);
  return response.json();
};
