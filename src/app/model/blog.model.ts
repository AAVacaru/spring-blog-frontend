import { FileHandle } from "./file-handle.model";

export interface Blog {
    blogId: null;
    title: String;
    content: String;
    category: CategoryEnum;
    authorName: String;
    date: String;
    pictures: FileHandle[];
}

export enum CategoryEnum {
    TRAVEL = "Travel",
    FOOD = "Food",
    FASHION = "Fashion",
    OTHER = "Other"
  }