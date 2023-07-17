export interface ITodoItem {
	id: number;
	title: string;
	content: string;
	tags: { id: number; level: number; name: string; }[];
}

export interface IAddOrEditTodo {
  title: string;
  content: string;
  tagName: string;
  level: number;
}