/// <reference types="vite/client" />

interface DataEntry {
  label: string;
  id?: string;
  children?: DataEntry[];
}

interface LeafInfo {
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  description: string;
}
