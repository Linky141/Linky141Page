import { CommentModel } from "./comment.model";

export type ProjectModel = {
  id: number;
  title: string;
  lastUpdate: number;
  github: string;
  description: string;
  photos: string[];
  comments: CommentModel[];
};
