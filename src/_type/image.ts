export type ImageData = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  img: {
    url: string;
    height: number;
    width: number;
  };
  url: string;
  description: string;
};