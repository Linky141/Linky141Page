import { CommentModel } from "./comment.model";

export type ProjectData = {
  id: string;
  title: string;
  lastUpdate: number;
  github: string;
  description: string;
  photos: string[];
  comments: CommentModel[];
};
