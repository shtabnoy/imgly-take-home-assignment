/// <reference types="vite/client" />

interface ImglyNode {
  label: string;
  id?: string;
  children?: DataEntry[];
}

interface ImglyLeafNodeInfo {
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  description: string;
}
